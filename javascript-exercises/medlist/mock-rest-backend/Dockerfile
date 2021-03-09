FROM golang:1.14

# Set go bin which doesn't appear to be set already.
ENV GOBIN /go/bin

# build directories
RUN mkdir /app
RUN mkdir /go/src/app
ADD . /go/src/app
WORKDIR /go/src/app

# Build my app
RUN go build -o /app/main .
CMD ["/app/main"]
