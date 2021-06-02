#!/usr/bin/env bash
set -e

# echo "Running TSLint..."
# tslint 'src/**/*.{ts,tsx}'

echo "Build started..."
echo "Removing old builds..."
rm -rf dist

echo "TSC: Building package..."
tsc --outDir dist

echo "BUILD SUCCESS!"
