# Use the official Golang image for the build
FROM golang:1.20-alpine AS builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files to the workspace
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source code into the container
COPY . .

# Build the Go app
RUN go build -o main ./cmd/server

# Use a minimal image for the runtime
FROM alpine:latest

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy the Pre-built binary file from the builder stage
COPY --from=builder /app/main .

# Create the upload directory and its subdirectories
RUN mkdir -p /app/upload/images

# Expose port (make sure it matches the one you use in your app)
EXPOSE 8080

# Command to run the executable
CMD ["./main"]
