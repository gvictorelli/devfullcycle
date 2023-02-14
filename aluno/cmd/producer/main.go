package main

import "github.com/confluentinc/confluent-kafka-go/kafka"

func main() {

}

func produce(msg *kafka.Message) {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "host.docker.internal:9092",
	}
	kafkaProducer, err := kafka.NewProducer(configMap)
	if err != nil {
		panic(err)
	}
	kafkaProducer.Produce(msg, nil)
}
