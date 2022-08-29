curl -X POST \
  'https://34.201.81.34:443/olympicWinners' \
  --header 'Accept: /' \
  --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
  --header 'Host: ag-grid-server.herokuapp.com' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "startRow": 30,
  "endRow": 40,
  "rowGroupCols": [],
  "valueCols": [],
  "pivotCols": [],
  "pivotMode": false,
  "groupKeys": [],
  "filterModel": {},
  "sortModel": []
}'



https://34.201.81.34:443/olympicWinners



{"startRow":30,"endRow":40,"rowGroupCols":[],"valueCols":[],"pivotCols":[],"pivotMode":false,"groupKeys":[],"filterModel":{},"sortModel":[]}





curl -X POST -k  'https://34.201.81.34:443/olympicWinners'  --header 'Host: ag-grid-server.herokuapp.com'
  --header 'Content-Type: application/json'   --data-raw '{                                                                            
  "startRow": 30,
  "endRow": 40,
  "rowGroupCols": [],
  "valueCols": [],
  "pivotCols": [],
  "pivotMode": false,
  "groupKeys": [],
  "filterModel": {},
  "sortModel": []
}'



labs.play-with-docker.com
curl -fsSL https://raw.githubusercontent.com/developer-by-choice/ag-grid-server/docker/start.sh | bash

