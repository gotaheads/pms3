#!/bin/bash
JSON=history-remove$1.json
echo $JSON
curl -u 6b79d86bcf4b09d8c1bf005f986c2844:x -H "Accept:application/json" https://portfolioms.capsulecrm.com/api/history > $JSON

cp loadh.sh remove$1.sh

