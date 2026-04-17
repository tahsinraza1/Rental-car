import re
import json
import urllib.request

with open('src/data/cars.ts', 'r', encoding='utf-8') as f:
    text = f.read()

names = re.findall(r"name:\s*'([^']+)'", text)
rows = json.loads(urllib.request.urlopen('https://opensheet.elk.sh/1CDDKB1_U47E4yQZ_vIRsd4ouC8PoPiMWfRYc1F0tcM/Sheet1').read().decode())


def normalize(s: str) -> str:
    return re.sub(r'[^a-z0-9 ]', '', re.sub(r'\s+', ' ', s.strip().lower()))

for name in names:
    norm = normalize(name)
    match = next((r for r in rows if normalize(r.get('Car', '')) == norm), None)
    if not match:
        match = next(
            (
                r
                for r in rows
                if normalize(r.get('Car', ''))
                and (norm in normalize(r.get('Car', '')) or normalize(r.get('Car', '')) in norm)
            ),
            None,
        )
    print(json.dumps(
        {
            'name': name,
            'matched': bool(match),
            'sheetCar': match.get('Car') if match else None,
            'availability': match.get('Availability') if match else None,
            'price': match.get('Price ') if match else None,
        },
        ensure_ascii=False,
    ))
