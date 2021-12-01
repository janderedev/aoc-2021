#!/bin/bash

COUNTER=1
while [[ -d "Day $COUNTER" ]]; do COUNTER=$(($COUNTER+1)); done

for i in {1..2} ; do
    mkdir -p "Day $COUNTER/$i"
    cp .setup_preset/* "Day $COUNTER/$i"
done

touch "Day $COUNTER/input.txt"
