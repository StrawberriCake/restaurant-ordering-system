### module doesnt work with aws version
#module "cloudwatch_logs" {
#  source  = "DNXLabs/eks-cloudwatch-logs/aws"
#  version = "0.1.5"
#  enabled = true
#
#  cluster_name                     = module.eks.eks_cluster.cluster_id//module.eks_cluster.cluster_id
#  cluster_identity_oidc_issuer     = module.eks.eks_cluster.cluster_oidc_issuer_url //module.eks_cluster.cluster_oidc_issuer_url
#  cluster_identity_oidc_issuer_arn = module.eks.eks_cluster.oidc_provider_arn //module.eks_cluster.oidc_provider_arn
#  worker_iam_role_name             = module.eks.eks_cluster.worker_iam_role_name //module.eks_cluster.worker_iam_role_name
#  region                           = var.aws_region
#}
#


resource "kubernetes_namespace" "cloudwatch" {
  metadata {
    name = "eks-cloudwatch"
  }
}

resource "aws_iam_policy" "cloudwatch_logs_policy" {
  name        = "cloudwatch-logs-policy"
  description = "Policy for CloudWatch logs access"
  policy      = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "logs:DescribeLogStreams",
                "logs:DescribeLogGroups"
            ],
            "Resource": "*"
        }
    ]
}
EOF
}

resource "aws_iam_role" "fluent_bit_role" {
  name = "fluent-bit-role"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "eks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "attach_cloudwatch_policy" {
  policy_arn = aws_iam_policy.cloudwatch_logs_policy.arn
  role       = aws_iam_role.fluent_bit_role.name
}


resource "kubernetes_service_account" "fluent_bit" {
  metadata {
    name      = "fluent-bit"
    namespace = kubernetes_namespace.cloudwatch.metadata[0].name
    annotations = {
      "eks.amazonaws.com/role-arn" = aws_iam_role.fluent_bit_role.arn
    }
  }
}


resource "kubernetes_config_map" "fluent_bit_config" {
  metadata {
    name      = "fluent-bit-config"
    namespace = kubernetes_namespace.cloudwatch.metadata[0].name
    labels = {
      "k8s-app" = "fluent-bit"
    }
  }

  data = {
    "fluent-bit.conf" = <<EOF
[SERVICE]
    Flush        1
    Daemon       Off
    Log_Level    info
    Parsers_File parsers.conf

[INPUT]
    Name        tail
    Path        /var/log/containers/*.log
    Parser      docker
    Tag         kube.*

[OUTPUT]
    Name        cloudwatch_logs
    Match       *
    region      ${var.aws_region}
    log_group_name  /aws/containerinsights/${var.eks_cluster_name}/application
    log_stream_prefix from-fluent-bit-
    auto_create_group true
EOF
    "parsers.conf" = <<EOF
[PARSER]
    Name        docker
    Format      json
    Time_Key    time
    Time_Format %Y-%m-%dT%H:%M:%S.%L
    Time_Keep   On
    Decode_Field_As json message
    Decode_Field_As escaped_utf8 log
EOF
  }
}

resource "kubernetes_daemonset" "fluent_bit" {
  metadata {
    name      = "fluent-bit"
    namespace = kubernetes_namespace.cloudwatch.metadata[0].name
    labels = {
      "k8s-app" = "fluent-bit"
    }
  }

  spec {
    selector {
      match_labels = {
        "k8s-app" = "fluent-bit"
      }
    }

    template {
      metadata {
        labels = {
          "k8s-app" = "fluent-bit"
        }
      }

      spec {
        service_account_name = kubernetes_service_account.fluent_bit.metadata[0].name
        container {
          name  = "fluent-bit"
          image = "fluent/fluent-bit:1.8"

          resources {
            limits = {
              memory = "200Mi"
            }
            requests = {
              cpu    = "100m"
              memory = "100Mi"
            }
          }

          volume_mount {
            name      = "varlog"
            mount_path = "/var/log"
          }

          volume_mount {
            name       = "varlibdockercontainers"
            mount_path = "/var/lib/docker/containers"
            read_only  = true
          }
        }

        volume {
          name = "varlog"
          host_path {
            path = "/var/log"
          }
        }
        volume {
          name = "varlibdockercontainers"
          host_path {
            path = "/var/lib/docker/containers"
          }
        }
      }
    }
  }
}
