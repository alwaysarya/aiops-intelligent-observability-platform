"""Email alert channel."""
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from src.channels.base import BaseChannel
from src.models.alert import Alert
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.metrics import ALERT_SEND_LATENCY, ALERTS_FAILED, ALERTS_SENT


class EmailChannel(BaseChannel):
    """Sends alerts via SMTP email."""

    name = "email"

    def __init__(self):
        super().__init__()
        self.enabled = settings.email_enabled
        self.host = settings.smtp_host
        self.port = settings.smtp_port
        self.user = settings.smtp_user
        self.password = settings.smtp_password
        self.from_addr = settings.email_from
        self.to_addr = settings.email_to

    def is_enabled(self) -> bool:
        return self.enabled and bool(self.user) and bool(self.password)

    async def send(self, alert: Alert) -> bool:
        if not self.is_enabled():
            logger.debug("Email channel disabled")
            return False

        with ALERT_SEND_LATENCY.labels(channel=self.name).time():
            try:
                msg = MIMEMultipart("alternative")
                msg["Subject"] = f"[{alert.severity.value.upper()}] {alert.title}"
                msg["From"] = self.from_addr
                msg["To"] = self.to_addr

                text_body = self.format_alert(alert)
                html_body = self._build_html(alert)

                msg.attach(MIMEText(text_body, "plain"))
                msg.attach(MIMEText(html_body, "html"))

                with smtplib.SMTP(self.host, self.port, timeout=10) as server:
                    server.starttls()
                    server.login(self.user, self.password)
                    server.send_message(msg)

                ALERTS_SENT.labels(channel=self.name, severity=alert.severity.value).inc()
                logger.info(f"Email alert sent: {alert.alert_id}")
                return True

            except Exception as e:
                ALERTS_FAILED.labels(channel=self.name, reason=type(e).__name__).inc()
                logger.error(f"Email send failed: {e}")
                return False

    def _build_html(self, alert: Alert) -> str:
        colors = {
            "low": "#28a745",
            "medium": "#ffc107",
            "high": "#fd7e14",
            "critical": "#dc3545",
        }
        color = colors.get(alert.severity.value, "#6c757d")

        return f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <div style="border-left: 4px solid {color}; padding: 16px; background: #f8f9fa;">
                <h2 style="color: {color}; margin: 0;">
                    {alert.severity.value.upper()} — {alert.title}
                </h2>
                <table style="margin-top: 16px;">
                    <tr><td><b>Service:</b></td><td>{alert.service}</td></tr>
                    <tr><td><b>Host:</b></td><td>{alert.host}</td></tr>
                    <tr><td><b>Score:</b></td><td>{alert.anomaly_score}</td></tr>
                    <tr><td><b>Time:</b></td><td>{alert.timestamp.isoformat()}</td></tr>
                </table>
                <p style="margin-top: 16px;"><b>Message:</b><br>{alert.message}</p>
            </div>
        </body>
        </html>
        """
