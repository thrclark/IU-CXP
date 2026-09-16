import json, re, random

BASE = "."
DIFF_PATH = "Claude outputs/one-iu-diff.json"
TS_PATH = "src/app/campus-services/service-directory.ts"

with open(DIFF_PATH, encoding="utf-8") as f:
    diff = json.load(f)

with open(TS_PATH, encoding="utf-8") as f:
    ts = f.read()

existing_slugs = set(re.findall(r"slug: '([^']*)'", ts))

ICONS = [
    "task-icons/academic-calendar.png",
    "task-icons/canvas.png",
    "task-icons/checklist.png",
    "task-icons/citi-training.png",
    "task-icons/eye-chart.png",
    "task-icons/kuali-time.png",
    "task-icons/mail-refresh.png",
    "task-icons/remote-work.png",
    "task-icons/resume.png",
    "task-icons/signpost.png",
    "task-icons/travel.png",
]

CATEGORY_RULES = [
    ("Health & Wellness", ["prevention education", "health", "timelycare", "caps", "counsel", "wellness",
                            "immuniz", "medhub", "med+proctor", "dentnet", "nutrition", "mental health"]),
    ("Compliance & Policy", ["compliance", "coi-c", "conflict of interest", "ferpa", "acceptable use",
                              "bylaws", "polic", "records retention", "citizenship verification",
                              "use agreement", "911 acknowledgement"]),
    ("Research", ["grant", "irb", "research", "redcap", "oncore", "ilab", "coeus", "protocol",
                   "commitment tracking", "ora ", "participant payment", "elements @"]),
    ("Career Services", ["career", "jobs", "handshake", "hiring", "employ", "resume", "internship",
                          "staff position", "job search"]),
    ("Human Resources", ["hrms", "payroll", "paycheck", "employee", "benefit", "fmla", " ppl ",
                          "new employee", "i-9", "background check", "w-2", "1098", "direct deposit",
                          "total rewards", "salary", "staff governance", "leave", "onboard",
                          "human resources", "tam"]),
    ("Finance", ["bursar", "kfs", "kuali financial", "accounts receivable", "invoice", "procurement",
                  "purchasing", "travel management", "expense", "tuition", "financial aid", "fafsa",
                  "scholarship", "account view", "controller", "treasury", " fee ", "deposit",
                  "crimsoncard", "loan", "emburse", "chrome river", "budget", "billing", "bex"]),
    ("Campus & Transportation", ["bus ", "parking", "shuttle", "transportation", "map and direction",
                                   "housing", "dining", "laundry", "floorplan", "campus map", "garages",
                                   "jag spots"]),
    ("Library Services", ["library", "iucat", "onesearch", "journals"]),
    ("Academic", ["class", "course", "syllab", "grade", "transcript", "registrar", "registration",
                   "advis", "academic", "degree", "major", "bulletin", "sis ", "student center",
                   "faculty center", "enroll", "exam", "roster", "worklist", "edoc", "candidacy",
                   "dissertation", "thesis", "eText", "textbook"]),
    ("IT Services", ["microsoft", "google", "adobe", "duo", "zoom", "print", "software", "it support",
                      "password", "passphrase", "login", "vpn", "wireless", "device", "confluence",
                      "jira", "github", "crm", "salesforce", "kaltura", "top hat", "brightspace",
                      "canvas", "iuanyware", "servicenow", "copilot", "gemini", "notebooklm",
                      "firefly", "teams", "email", "exchange", "365", "cloud storage", "generative ai",
                      "redcap" ]),
    ("Student Services", ["student central", "student services", "orientation", "housing application",
                            "pantry", "spot", "advocate"]),
]

def classify(title):
    t = title.lower()
    for category, keywords in CATEGORY_RULES:
        for kw in keywords:
            if kw in t:
                return category
    return "Campus Services"

def slugify(title):
    s = title.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    if not s:
        s = "task"
    return s

def unique_slug(title):
    base = slugify(title)
    slug = base
    n = 2
    while slug in existing_slugs:
        slug = f"{base}-{n}"
        n += 1
    existing_slugs.add(slug)
    return slug

def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

ALL_CODE_ORDER = ["IUB", "IUI", "IUE", "IUK", "IUN", "IUS", "IUSB", "IUFW", "IUC"]

random.seed()

entries_text = []
for row in diff:
    title = row["title"]
    slug = unique_slug(title)
    category = classify(title)
    icon = random.choice(ICONS)
    if row.get("isAll"):
        campuses_ts = "ALL_CAMPUS_CODES"
    else:
        codes = [c for c in ALL_CODE_ORDER if c in row["campuses"]]
        campuses_ts = "[" + ", ".join(f"'{c}'" for c in codes) + "]"

    t_esc = esc(title)
    entry = f"""  {{
    slug: '{slug}',
    title: '{t_esc}',
    category: '{category}',
    description: 'Access {t_esc} through One.IU.',
    extendedDescription: '{t_esc} is available through One.IU for Indiana University students, faculty, and staff. Select "Launch service" to open it, or contact the UITS Support Center if you need help getting started.',
    imageIcon: '{icon}',
    launchUrl: '#',
    campuses: {campuses_ts},
    supportLinks: [
      {{ label: 'UITS Support Center', url: 'https://uits.iu.edu/contact' }},
    ],
  }},"""
    entries_text.append(entry)

insertion_marker = "];\n\n/** Curated services plus the generated directory, for dashboard search. */"
assert ts.count(insertion_marker) == 1, "marker not found or not unique"

new_block = "\n".join(entries_text) + "\n"
ts_new = ts.replace(insertion_marker, new_block + insertion_marker, 1)

with open(TS_PATH, "w", encoding="utf-8") as f:
    f.write(ts_new)

before_count = ts.count("slug: '")
after_count = ts_new.count("slug: '")
print(f"Added {len(diff)} entries. slug count before={before_count} after={after_count}")

from collections import Counter
cat_counts = Counter(classify(r["title"]) for r in diff)
for cat, n in cat_counts.most_common():
    print(f"  {cat}: {n}")
