#!/bin/bash

function copy-env {
  SOURCE=$1
  TARGET=$2
  echo "cp $SOURCE $TARGET"
  cp $SOURCE $TARGET || { echo "cp failed"; exit 1 }
}
