# langflow on AWS

[langflow](https://github.com/logspace-ai/langflow) を [AWS CDK](https://aws.amazon.com/jp/cdk/) を用いて [Amazon EC2](https://aws.amazon.com/jp/ec2/) 上にホストします。

## 使い方

1. このリポジトリをクローン  
```git clone https://github.com/kazuki306/langflow-cdk.git```
1. 必要なモジュールをインストール  
```npm install```
1. CloudFormationのテンプレート作成  
```cdk synth```
1. ブートストラップスタックをインストール  
```cdk bootstrap```
1. デプロイ  
```cdk deploy```
1. Outputs に表示される URL にアクセス。EC2 の環境構築までに10分~15分かかります。  
```Outputs: LangflowCdkStack.DNSAdress = http://XXX.HOSTED_REAGION.elb.amazonaws.com:7860```
1. 削除  
```cdk destroy```

## 環境構築
Cloud9 上で動作を確認しています。環境構築の方法は[こちら](https://docs.aws.amazon.com/ja_jp/cloud9/latest/user-guide/sample-cdk.html)。
