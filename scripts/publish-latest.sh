#!/usr/bin/env bash
set -e

read -p "You're pushing out a public build. Continue (y/n)?" CONT
if [ "$CONT" = "y" ]; then

npm run clean
npm run build

echo "Pushing out LATEST build to internal registry..."
npm config set registry http://10.85.59.116/artifactory/v1.0/artifacts/npm/
npm publish
echo "Pushing out LATEST build to default registry..."
npm config set registry https://registry.npmjs.org
npm publish

echo "PUSH SUCCESS"
fi