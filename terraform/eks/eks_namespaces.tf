resource "kubernetes_namespace" "restaurant" {
  metadata {
    name = "restaurant"
  }
}

resource "kubernetes_namespace" "amazon-cloudwatch" {
  metadata {
    name = "amazon-cloudwatch"
  }
}