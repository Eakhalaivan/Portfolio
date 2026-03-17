FROM mysql:8.0
ENV MYSQL_DATABASE=portfolio_db
EXPOSE 3306
CMD ["mysqld", "--innodb-buffer-pool-size=64M", "--max-connections=20", "--innodb-log-buffer-size=16M"]
