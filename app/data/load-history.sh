#!/bin/bash


curl -u 4d002871e127fd558f7761bccf2858e4:x -H "Content-type:application/json" -i -d '{"historyItem": {"entryDate":"2009-09-16T09:00:00Z", "note": "Phone: Jock reported on valuation of properties. Discussed investment." }}' https://portfolioms.capsulecrm.com/api/party/62330885/history

curl -u 4d002871e127fd558f7761bccf2858e4:x -H "Content-type:application/json" -i -d '{"historyItem": {"entryDate":"2009-09-17T09:00:00Z", "note": "Email: Phillip Sent through 13 Junction Street, Glebe via e-mail" }}' https://portfolioms.capsulecrm.com/api/party/62330885/history