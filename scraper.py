import urllib2
import bs4

page = urllib2.urlopen('http://www.foosball.com/learn/rules/ustsa/').read()
soup = bs4.BeautifulSoup(page, 'lxml')

class Rule:
    def __init__(self, description):
        self.description = description

class Section:
    
    def __init__(self, title):
        self.title = title
        self.rules = []

    def add_rule(self, rule):
        self.rules.append(rule)

    def __repr__(self):
        return self.title


def get_rule_ids(soup):
    link_children = soup.find('strong', text="Links to Rules:").parent.children

    link_tags = filter(lambda x : type(x) == bs4.element.Tag, link_children)
    link_ids = filter(lambda x : x != None, map(lambda y : y.__dict__.get('attrs').get('href'), link_tags))

    return link_ids

def build_rule(id_):
    description = ""
    rule = Rule(description)
    return None

print get_rule_ids(soup)

if __name__ == '__main__':
    ids = get_rule_ids(soup)
    ids = map(lambda x : x[1:], ids)
    for id_ in ids:
        elem = soup.find('a', {'name': id_})
        title = elem.text
        section = Section(title)
        print section


