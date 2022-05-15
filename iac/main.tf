provider "azurerm" {
  features {}

  skip_provider_registration = true
}

data "azurerm_resource_group" "rg" {
  name = var.resource_group_name
}

data "azurerm_kubernetes_cluster" "kube" {
  name                = var.cluster_name
  resource_group_name = var.resource_group_name
}

provider "kubernetes" {
  host                   = data.azurerm_kubernetes_cluster.kube.kube_config.0.host
  client_certificate     = base64decode(data.azurerm_kubernetes_cluster.kube.kube_config.0.client_certificate)
  client_key             = base64decode(data.azurerm_kubernetes_cluster.kube.kube_config.0.client_key)
  cluster_ca_certificate = base64decode(data.azurerm_kubernetes_cluster.kube.kube_config.0.cluster_ca_certificate)
}

resource "kubernetes_deployment_v1" "deployment" {
  metadata {
    name = "webapp-dply"
  }

  spec {
    selector {
      match_labels = {
        app = "webapp-ui"
      }
    }

    replicas = 1

    template {
      metadata {
        labels = {
          app = "webapp-ui"
        }
      }

      spec {
        container {
          name  = "webapp"
          image = "docker.io/wadrydev/tfgshop"
          env {
            name  = "BackendUrls__Products"
            value = "http://10.0.39.121:80/"
          }
          env {
            name  = "BackendUrls__Orders"
            value = "http://10.0.39.121:80/"
          }
          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "svc" {
  metadata {
    name = "webapp-svc"
  }
  spec {
    selector = {
      app = "webapp-ui"
    }
    port {
      port        = 8082
      target_port = 80
    }
    type = "LoadBalancer"
  }
}
