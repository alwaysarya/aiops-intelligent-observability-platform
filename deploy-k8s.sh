#!/bin/bash

echo "🚀 Starting Kubernetes Deployment for AIOps Platform..."

# 1. Build Docker Images inside Minikube
echo "🐳 Building Docker Images (Inside Minikube)..."
eval $(minikube docker-env)

docker build -t aiops-log-ingestion:latest ./services/log-ingestion-service
docker build -t aiops-anomaly-detector:latest ./services/ai-anomaly-detector
docker build -t aiops-alert-service:latest ./services/alert-service
docker build -t aiops-rca:latest ./services/root-cause-analyzer
docker build -t aiops-api-gateway:latest ./services/api-gateway

# 2. Apply Kubernetes Manifests
echo "☸️ Applying K8s Manifests..."
kubectl apply -f kubernetes/base/namespace.yaml
kubectl apply -f kubernetes/base/all-services.yaml

# 3. Wait for rollout
echo "⏳ Waiting for Pods to be Ready..."
kubectl rollout status statefulset/postgres -n aiops
kubectl rollout status deployment/log-ingestion -n aiops
kubectl rollout status deployment/api-gateway -n aiops

echo "✅ Deployment Complete!"
echo "🌐 Access Gateway at: $(minikube service api-gateway -n aiops --url)"
echo ""
echo "Use 'kubectl get pods -n aiops' to monitor status."
