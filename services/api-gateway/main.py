from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import httpx

app = FastAPI(title="AIOps API Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SERVICES = {
    "ingestion": "http://log-ingestion-service:8000",
    "anomaly": "http://anomaly-detector:8001",
    "alerts": "http://alert-service:8002",
    "rca": "http://root-cause-analyzer:8003",
}

@app.get("/health")
async def health():
    return {"status": "gateway_healthy"}

@app.api_route("/api/{service}/{path:path}", methods=["GET", "POST", "PUT", "DELETE"])
async def proxy(service: str, path: str, request: Request):
    if service not in SERVICES:
        raise HTTPException(status_code=404, detail="Service not found")
    
    target_url = f"{SERVICES[service]}/{path}"
    
    # Copy query params
    query_params = dict(request.query_params)
    if query_params:
        query_str = "&".join([f"{k}={v}" for k, v in query_params.items()])
        target_url += f"?{query_str}"
    
    body = await request.body()
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.request(
                method=request.method,
                url=target_url,
                headers={k: v for k, v in request.headers.items() if k.lower() != 'host'},
                content=body,
                timeout=10.0
            )
            
            try:
                res_data = response.json()
            except:
                res_data = {"detail": response.text}
                
            return JSONResponse(
                content=res_data,
                status_code=response.status_code
            )
        except httpx.RequestError:
            return JSONResponse(status_code=503, content={"error": f"{service} service unavailable"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
