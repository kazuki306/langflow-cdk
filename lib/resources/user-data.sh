#!/bin/bash
sudo yum update -y
sudo yum groupinstall "Development Tools" -y
sudo yum install -y gcc openssl openssl-devel bzip2-devel libffi-devel sqlite-devel
sudo yum install -y python3-devel.x86_64
sudo wget https://www.python.org/ftp/python/3.9.13/Python-3.9.13.tgz
sudo tar xzf Python-3.9.13.tgz
sudo ./Python-3.9.13/configure --enable-optimizations
sudo make altinstall
pip3.9 install langflow
touch ./langlflow.log
langflow run --log-file ./langflow.log --host 0.0.0.0 --port 7860