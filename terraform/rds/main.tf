resource "aws_db_subnet_group" "rds-subnet-group" {
  name       = "ce5-group2-rds-private-subnet-group"
  subnet_ids = var.vpc_private_subnets

  tags = {
    Name = "rds-subnet-group"
  }
}
resource "aws_security_group" "mysql_db_sg" {
  name        = "ce5-group2-mysql-sg"
  description = "Allow MySQL traffic"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = var.vpc_private_subnets_cidr_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  depends_on = [
  aws_db_subnet_group.rds-subnet-group]

  tags = {
    owner = "ce5-group2"
  }

}


resource "aws_db_instance" "ce5-group2-mysql" {
  identifier           = "ce5-group2-restaurant"
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "mysql"
  engine_version       = "8.0.35"
  instance_class       = "db.t3.micro"
  port                 = "3306"
  username             = var.mysql_username
  password             = var.mysql_password
  db_subnet_group_name = aws_db_subnet_group.rds-subnet-group.name

  vpc_security_group_ids = [aws_security_group.mysql_db_sg.id]

  skip_final_snapshot = true

  tags = {
    owner = "ce5-group2"
  }
}
