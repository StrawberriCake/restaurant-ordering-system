
output "mysql_private_address" {
  description = "IP of the mysql DB in the private subnet"
  value       = aws_db_instance.ce5-group2-mysql.address
}

output "mysql_security_group_id" {
  description = "Security group ids of the mysql RDS instance"
  value       = aws_security_group.mysql_db_sg.id
}

output "mysql_instance_availability_zone" {
  description = "The availability zone of the mysql RDS instance"
  value       = aws_db_instance.ce5-group2-mysql.availability_zone
}