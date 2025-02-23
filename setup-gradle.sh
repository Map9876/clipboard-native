#!/bin/bash

# 创建目录
mkdir -p gradle/wrapper

# 下载 Gradle Wrapper JAR
wget -O gradle/wrapper/gradle-wrapper.jar https://raw.githubusercontent.com/gradle/gradle/v8.2.0/gradle/wrapper/gradle-wrapper.jar

# 创建 gradle-wrapper.properties
cat > gradle/wrapper/gradle-wrapper.properties << EOL
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.2-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
networkTimeout=10000
EOL

# 下载 gradlew 脚本
wget -O gradlew https://raw.githubusercontent.com/gradle/gradle/v8.2.0/gradlew
wget -O gradlew.bat https://raw.githubusercontent.com/gradle/gradle/v8.2.0/gradlew.bat

# 设置执行权限
chmod +x gradlew