bun install

# Build everything and prepare for single origin
bun run build:single
 
# Start the single origin server
PORT=8080 bun run start:single