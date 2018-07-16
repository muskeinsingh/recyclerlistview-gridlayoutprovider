#!/usr/bin/env bash
set -e

echo "Running TSLint..."
tslint 'src/**/*.{ts,tsx}'

echo "Build started..."
echo "Removing old builds..."
rm -rf node_modules
rm -rf dist
echo "Installing dependencies"
npm install

echo "TSC: Building package..."
tsc --outDir dist

echo "BUILD SUCCESS!"
