测试URL:
http://localhost:8080/cqcm/h5intf/json_intf/test
显示为以下样式结果即为成功
{"code":"0000","desc":"成功","data":{"TODAY":1442476884000},"time":15}


注意：
添加oracle的jdbc到maven，ojdbc14-10.2.0.3.0.jar为oracle自带jdbc驱动(例如：ojdbc6.jar)
mvn install:install-file -DgroupId=com.oracle -DartifactId=ojdbc14 -Dversion=10.2.0.3.0 -Dpackaging=jar -Dfile=ojdbc14-10.2.0.3.0.jar

