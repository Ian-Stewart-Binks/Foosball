# Rule Scraper

This script named scrape.py gets the html from www.foosball.com and tries its very best to parse them into a nice json format. The rules do not follow very consistent html style so the parse is not perfect.

## Usage

```
python scrape.py
```

Will produce a rules.json file containing the official foosball rules in a json format.

The resulting json has the following format:

```json
{
    "Rule name" : ["list of rule's contents"],
    "Other rule name" : ["list of other rule's contents"],
    "..."
}
```
