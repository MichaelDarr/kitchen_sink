#!/usr/bin/env bash
# Script Description
# Usage: ./best_practices.sh

# Exit immediately if a command in the script fails
set -e

# Print all commands as they are executed
set -x

# Ensure this script is being run from this dir, not caller's
cd "$(dirname "$0")"
