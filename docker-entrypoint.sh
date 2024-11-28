#!/bin/sh
# Exit immediately if a command exits with a non-zero status
set -e

# Echo the command being executed (for debugging purposes)
echo "Starting the application..."

# Execute the given command as an entrypoint
exec "$@"
