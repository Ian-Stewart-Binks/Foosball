from bs4 import BeautifulSoup
import json
import requests
import re


class Scraper:
    """
    Scrapes foosball rules from the official foosball website
    and produces a rules.json file.
    """
    def parse_long(self):
        """Parses the long rules list"""
        self.setup_soup("http://www.foosball.com/learn/rules/ustsa/")
        return self._dfs(self.soup.ol)

    def parse_short(self):
        """Parses the short rules list"""
        self.setup_soup("http://www.foosball.com/learn/rules/onepage/")
        return self._short()

    def setup_soup(self, url):
        """Initializes the soup object given a url"""
        html = requests.get(url).text
        self.soup = BeautifulSoup(html, "lxml")

    def _dfs(self, node):
        """
        Perform a dfs and make a list of lists representing a tree of
        rules
        """
        if len(node.contents) <= 1:
            return node.text.replace("\n", "").replace("\r", "")
        else:
            return [self._dfs(i) for i in node.findChildren()]

    def _short(self):
        """Implmentation method for short html parse"""
        table = self._get_tables()
        rules = self._build_rules(table)
        self._write_rules(rules)

    def _get_tables(self):
        """Get the table html text from the rules list"""
        tables = self.soup.findAll("td")
        table_one = re.split("[0-9]+\.", tables[0].text)
        table_two = re.split("[0-9]+\.", tables[1].text)
        table_one.extend(table_two)
        return table_one

    def _build_rules(self, html):
        """Build the tree of rules as a dictionary"""
        rules = []
        clean_html = map(self._cleanup_string, html)
        for i in clean_html:
            rule = {}
            rule_name = i[0]
            rule["name"] = rule_name
            contents = "".join(i[1:])
            rule["contents"] = re.split("[A-Z]\.", contents)
            rules.append(rule)
        return rules

    def _cleanup_string(self, string):
        """Cleanup gunk on strings new lines, tabs carriage returns etc"""
        string = re.sub(" +", " ", string)
        string = string.encode("ascii", "ignore")
        string = string.split("\n")
        string = [j.strip("\t\r ") for j in string]
        return string

    def _write_rules(self, rules):
        """Write the rules to a json file"""
        with open("rules.json", "w") as f:
            json.dump(rules, f, indent=4)


if __name__ == "__main__":
    scrape = Scraper().parse_short()
