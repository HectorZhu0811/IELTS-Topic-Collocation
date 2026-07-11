import json
import re
import subprocess
import time
import urllib.request
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parents[2]
EXPORT_DIR = PROJECT_DIR / "project-artifacts" / "exports" / "anki" / "full-export"
RESULT_FILE = EXPORT_DIR / "notion-subtopic-collocations-anki-sync-result.json"
NODE = Path("/Users/hector/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node")
SOURCE_JS = PROJECT_DIR / "web-source" / "scripts" / "export-notion-subtopic-anki.js"
SOURCE_DATA_JS = PROJECT_DIR / "web-source" / "data.js"

WRONG_DECK = "IELTS Topic Collocation::2025-2026 Subtopics"
ROOT_DECK = "IELTS::Collocations::Topic Collocation"
CHUNK_SIZE = 10

TOPIC_DECKS = {
    "Technology": "科技 Technology",
    "Education": "教育 Education",
    "Environment": "环境 Environment",
    "Government": "政府 Government",
    "Society": "社会 Society",
    "Health": "健康 Health",
    "Urbanization": "城市化 Urbanization",
    "Media": "媒体 Media",
    "Economy": "经济 Economy",
    "Arts": "艺术 Arts",
}

CUSTOM_PHRASE_ZH = {
    "develop computer skills": "培养电脑技能",
    "develop food technology": "发展食品技术",
    "develop sustainable agriculture": "发展可持续农业",
    "develop media literacy": "培养媒介素养",
    "develop transferable skills": "培养可迁移技能",
    "develop the tourism industry": "发展旅游业",
    "develop cultural understanding": "培养文化理解",
    "preserve cultural heritage": "保护文化遗产",
    "preserve face-to-face interaction": "保留面对面互动",
    "preserve natural landscapes": "保护自然景观",
    "preserve sentimental value": "保留情感价值",
    "preserve housing styles": "保留住房风格",
    "preserve architectural style": "保留建筑风格",
    "preserve collective memory": "保存集体记忆",
    "critically endangered species": "极度濒危的物种",
    "pristine untouched natural places": "原始纯净的自然地区",
    "low-waste circular economy": "低浪费的循环经济",
    "high carbon emissions": "高碳排放",
    "short local supply chains": "较短的本地供应链",
    "strong fiscal responsibility": "强烈的财政责任意识",
    "effective law enforcement": "有效执法",
    "strengthen law enforcement": "加强执法",
    "practical balanced approach": "实用的平衡方法",
    "adopt a balanced approach": "采用平衡方法",
    "consistent parental discipline": "一致的父母管教",
    "apply parental discipline": "实施父母管教",
    "set clear boundaries": "设定明确边界",
    "rising youth crime": "上升的青少年犯罪",
    "aggressive antisocial behavior": "攻击性的反社会行为",
    "rising obesity rate": "上升的肥胖率",
    "spend family time": "共度家庭时光",
    "high monetary value": "较高的金钱价值",
    "avoid a sedentary lifestyle": "避免久坐生活方式",
    "monitor nutrient intake": "监测营养摄入",
    "minimally processed natural food": "最低程度加工的天然食品",
    "public road safety": "公共道路安全",
    "large-scale rural-urban migration": "大规模城乡迁移",
    "stimulate rural development": "促进农村发展",
    "compare salary levels": "比较薪资水平",
    "high workforce mobility": "高劳动力流动性",
    "rapidly aging workforce": "快速老龄化的劳动力",
    "use planned obsolescence": "采用计划性淘汰",
    "public art galleries": "公共美术馆",
    "interactive exhibitions": "互动式展览",
    "deep cultural understanding": "深入的文化理解",
    "fluent cross-cultural communication": "顺畅的跨文化交流",
    "centuries-old historic buildings": "有数百年历史的建筑",
}


def request(action, params=None, timeout=20):
    payload = json.dumps({"action": action, "version": 6, "params": params or {}}).encode("utf-8")
    req = urllib.request.Request(
        "http://127.0.0.1:8765",
        data=payload,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        data = json.loads(response.read().decode("utf-8"))
    if data.get("error"):
        raise RuntimeError(data["error"])
    return data.get("result")


def load_topics():
    script = f"""
const data = require({json.dumps(str(SOURCE_JS))});
process.stdout.write(JSON.stringify(data.topics));
"""
    result = subprocess.run(
        [str(NODE), "-e", script],
        check=True,
        capture_output=True,
        text=True,
        cwd=PROJECT_DIR,
    )
    return json.loads(result.stdout)


def slug(value):
    out = []
    last_dash = False
    for char in value.lower().replace("&", "and"):
        if char.isalnum():
            out.append(char)
            last_dash = False
        elif not last_dash:
            out.append("-")
            last_dash = True
    return "".join(out).strip("-")


def html_escape(value):
    return (
        str(value)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


CUSTOM_BASE_ZH = {
    "a balanced approach": "平衡的方法",
    "a circular economy": "循环经济",
    "a historical perspective": "历史视角",
    "a logistics network": "物流网络",
    "a sedentary lifestyle": "久坐的生活方式",
    "a vegetarian diet": "素食饮食",
    "academic assessment": "学业评估",
    "adult literacy": "成人识字能力",
    "advertising influence": "广告影响",
    "aging workforce": "老龄化劳动力",
    "air travel": "航空出行",
    "an aging workforce": "老龄化劳动力",
    "antisocial behavior": "反社会行为",
    "architectural style": "建筑风格",
    "art galleries": "美术馆",
    "art projects": "艺术项目",
    "automation tools": "自动化工具",
    "balanced approach": "平衡的方法",
    "balanced reporting": "平衡报道",
    "barriers": "壁垒",
    "behavioral standards": "行为标准",
    "boundaries": "边界",
    "business courses": "商业课程",
    "business data": "商业数据",
    "carbon emissions": "碳排放",
    "carbon offsets": "碳抵消",
    "career adaptability": "职业适应能力",
    "career change": "职业转变",
    "character": "品格",
    "character development": "品格发展",
    "circular economy": "循环经济",
    "classroom time": "课堂时间",
    "collective memory": "集体记忆",
    "communication technology": "通信技术",
    "community identity": "社区身份认同",
    "community supervision": "社区监督",
    "competition": "竞争",
    "computer skills": "电脑技能",
    "conservation measures": "保护措施",
    "constructive journalism": "建设性新闻",
    "consumer awareness": "消费者意识",
    "consumer choice": "消费者选择",
    "consumption": "消费",
    "consumption habits": "消费习惯",
    "content ratings": "内容分级",
    "cooperative spirit": "合作精神",
    "critical thinking": "批判性思维",
    "cross-cultural communication": "跨文化交流",
    "cultural heritage": "文化遗产",
    "cultural immersion": "文化沉浸",
    "cultural participation": "文化参与",
    "cultural policy": "文化政策",
    "cultural understanding": "文化理解",
    "demand": "需求",
    "digital boundaries": "数字边界",
    "digital payment": "数字支付",
    "districts": "街区",
    "driver's license": "驾驶执照",
    "e-commerce": "电子商务",
    "early intervention": "早期干预",
    "eating habits": "饮食习惯",
    "ecological balance": "生态平衡",
    "ecotourism": "生态旅游",
    "educational access": "教育机会",
    "educational inequality": "教育不平等",
    "emotional support": "情感支持",
    "empathy": "同理心",
    "employability": "就业能力",
    "employment": "就业",
    "evidence-based policy": "循证政策",
    "exhibitions": "展览",
    "face-to-face interaction": "面对面互动",
    "fact-checking": "事实核查",
    "fair competition": "公平竞争",
    "family bonds": "家庭纽带",
    "family relationships": "家庭关系",
    "family time": "家庭时间",
    "fast fashion": "快时尚",
    "feedback": "反馈",
    "financial pressure": "经济压力",
    "fiscal responsibility": "财政责任",
    "food labels": "食品标签",
    "food safety": "食品安全",
    "food systems": "食物系统",
    "food technology": "食品技术",
    "gift exchange": "礼物交换",
    "gifts": "礼物",
    "government funding": "政府资金",
    "government regulation": "政府监管",
    "group study": "小组学习",
    "high-paying jobs": "高薪工作",
    "historic buildings": "历史建筑",
    "historic districts": "历史街区",
    "historical evidence": "历史证据",
    "historical perspective": "历史视角",
    "historical research": "历史研究",
    "historical sites": "历史遗址",
    "history curriculum": "历史课程",
    "housing demand": "住房需求",
    "housing style": "住房风格",
    "housing styles": "住房风格",
    "informed choices": "知情选择",
    "international business": "国际商业",
    "international trade": "国际贸易",
    "intrinsic motivation": "内在动机",
    "jobs": "工作",
    "labor market": "劳动力市场",
    "landmark buildings": "地标建筑",
    "language learning": "语言学习",
    "learner autonomy": "学习者自主性",
    "legal restrictions": "法律限制",
    "levels": "水平",
    "lifestyle change": "生活方式变化",
    "literacy programs": "识字项目",
    "local character": "地方特色",
    "local food": "本地食物",
    "local identity": "地方身份认同",
    "local resources": "本地资源",
    "local supply chains": "本地供应链",
    "logistics network": "物流网络",
    "logistics system": "物流系统",
    "materialism": "物质主义",
    "math education": "数学教育",
    "media violence": "媒体暴力",
    "misleading advertising": "误导性广告",
    "monetary value": "金钱价值",
    "moral education": "道德教育",
    "natural food": "天然食品",
    "natural landscapes": "自然景观",
    "new product versions": "新产品版本",
    "news coverage": "新闻报道",
    "nutrient intake": "营养摄入",
    "obesity rate": "肥胖率",
    "obsolescence": "过时淘汰",
    "offsets": "抵消额度",
    "older workers": "老年员工",
    "online communication": "线上沟通",
    "overtourism": "过度旅游",
    "parent-child relationship": "亲子关系",
    "parent-child relationships": "亲子关系",
    "parental discipline": "父母管教",
    "pedestrian safety": "行人安全",
    "peer feedback": "同伴反馈",
    "physical activity": "身体活动",
    "planned obsolescence": "计划性淘汰",
    "platform responsibility": "平台责任",
    "policy impact": "政策影响",
    "political news": "政治新闻",
    "population growth": "人口增长",
    "positive news": "正面新闻",
    "privacy boundaries": "隐私边界",
    "processed natural food": "加工较少的天然食品",
    "product innovation": "产品创新",
    "product upgrades": "产品升级",
    "programs": "项目",
    "public access": "公众进入",
    "public art": "公共艺术",
    "public funding": "公共资金",
    "public information": "公共信息",
    "public interest": "公共利益",
    "public services": "公共服务",
    "public transport fares": "公共交通票价",
    "ratings": "分级",
    "rational consumption": "理性消费",
    "relevant information": "相关信息",
    "reliable sources": "可靠来源",
    "retraining programs": "再培训项目",
    "right to repair": "维修权",
    "road network": "道路网络",
    "road safety": "道路安全",
    "road safety laws": "道路安全法规",
    "rural development": "农村发展",
    "rural-urban migration": "城乡迁移",
    "salary level": "薪资水平",
    "scientific breakthroughs": "科学突破",
    "scientific farming": "科学农业",
    "self-study": "自主学习",
    "sentimental value": "情感价值",
    "social media use": "社交媒体使用",
    "social optimism": "社会乐观情绪",
    "social order": "社会秩序",
    "space exploration": "太空探索",
    "spending priorities": "支出优先级",
    "standardized tests": "标准化考试",
    "student motivation": "学生动机",
    "supply chain": "供应链",
    "supply chain transparency": "供应链透明度",
    "sustainable agriculture": "可持续农业",
    "sustainable travel": "可持续出行",
    "teamwork": "团队合作",
    "technology training": "技术培训",
    "technology use": "技术使用",
    "textile waste": "纺织废料",
    "the history curriculum": "历史课程",
    "the logistics system": "物流系统",
    "the right to repair": "维修权",
    "the road network": "道路网络",
    "the supply chain": "供应链",
    "the tourism industry": "旅游业",
    "the urban population": "城市人口",
    "the urban-rural gap": "城乡差距",
    "ticket prices": "票价",
    "tourism industry": "旅游业",
    "tourism management": "旅游管理",
    "tourism revenue": "旅游收入",
    "trade barriers": "贸易壁垒",
    "trade-offs": "取舍",
    "traditional houses": "传统房屋",
    "traffic fines": "交通罚款",
    "traffic laws": "交通法规",
    "transferable skills": "可迁移技能",
    "travel habits": "出行习惯",
    "university education": "大学教育",
    "untouched natural places": "原始自然地区",
    "urban employment": "城市就业",
    "urban population": "城市人口",
    "urban services": "城市服务",
    "urban-rural gap": "城乡差距",
    "vegetarian diet": "素食饮食",
    "violent content": "暴力内容",
    "wildlife conservation": "野生动物保护",
    "work experience": "工作经验",
    "work-life balance": "工作生活平衡",
    "workers": "员工",
    "workforce mobility": "劳动力流动性",
    "workplace dignity": "职场尊严",
    "workplace technology": "职场技术",
    "workplace wellness": "职场健康项目",
    "youth crime": "青少年犯罪",
}

CUSTOM_ADJ_ZH = {
    "academic": "学术的",
    "accurate": "准确的",
    "ambitious": "雄心勃勃的",
    "attractive": "有吸引力的",
    "available": "可用的",
    "balanced": "平衡的",
    "better-paid": "薪资更高的",
    "broad": "广泛的",
    "broader": "更广泛的",
    "car-dependent": "依赖汽车的",
    "centuries-old": "有数百年历史的",
    "clear": "明确的",
    "climate-smart": "气候友好型的",
    "close": "亲密的",
    "competitive": "有竞争力的",
    "complex": "复杂的",
    "compulsive": "强迫性的",
    "constructive": "建设性的",
    "controlled": "受控的",
    "controversial": "有争议的",
    "damaging": "有破坏性的",
    "data-driven": "数据驱动的",
    "deceptive": "欺骗性的",
    "delicate": "脆弱的",
    "distinctive": "独特的",
    "equal": "平等的",
    "essential": "必备的",
    "experienced": "经验丰富的",
    "fluent": "流畅的",
    "foundational": "基础性的",
    "frequent": "频繁的",
    "fresh": "新鲜的",
    "graphic": "露骨的",
    "healthy": "健康的",
    "high-stakes": "高风险的",
    "historic": "有历史意义的",
    "inclusive": "包容性的",
    "instant": "即时的",
    "limited": "有限的",
    "low-impact": "低影响的",
    "low-waste": "低浪费的",
    "minimally": "最低程度加工的",
    "minor": "小幅的",
    "plant-based": "植物性的",
    "powerful": "强大的",
    "pristine": "原始纯净的",
    "profitable": "有利可图的",
    "public": "公共的",
    "rapidly": "快速地",
    "rational": "理性的",
    "real-time": "实时的",
    "reasonable": "合理的",
    "recognizable": "可识别的",
    "relevant": "相关的",
    "resilient": "有韧性的",
    "responsible": "负责任的",
    "secure": "安全的",
    "shared": "共同的",
    "short": "短的",
    "solution-focused": "聚焦解决方案的",
    "stable": "稳定的",
    "strained": "紧张承压的",
    "tangible": "有形的",
    "technology-driven": "技术驱动的",
    "thorough": "彻底的",
    "timely": "及时的",
    "transparent": "透明的",
    "unhealthy": "不健康的",
    "unique": "独特的",
    "unspoiled": "未受破坏的",
    "unsustainable": "不可持续的",
    "uplifting": "振奋人心的",
    "valid": "有效的",
    "valuable": "有价值的",
    "verified": "经过核实的",
    "wasteful": "浪费性的",
    "well-preserved": "保存完好的",
}

CUSTOM_VERB_ZH = {
    "access": "获取",
    "accommodate": "容纳",
    "adapt to": "适应",
    "allocate": "分配",
    "analyze": "分析",
    "assess": "评估",
    "attach": "赋予",
    "attach monetary value to": "赋予{base}金钱价值",
    "ban": "禁止",
    "buy": "购买",
    "change": "改变",
    "compare": "比较",
    "consult": "查阅",
    "cut": "减少",
    "display": "显示",
    "disseminate": "传播",
    "enter": "进入",
    "examine": "审视",
    "experience": "体验",
    "formulate": "制定",
    "gain": "获得",
    "give": "给予",
    "host": "举办",
    "lower": "降低",
    "make": "作出",
    "meet": "满足",
    "obtain": "获得",
    "offer": "提供",
    "promote rational": "促进理性",
    "purchase": "购买",
    "read": "阅读",
    "release": "发布",
    "relieve": "缓解",
    "remove": "消除",
    "resist": "抵制",
    "retain": "保留",
    "save": "拯救",
    "seek": "寻求",
    "serve": "服务于",
    "set": "设定",
    "share": "分享",
    "spend": "花费",
    "subsidize": "补贴",
    "trace": "追溯",
    "use planned": "使用计划性",
    "visit": "参观",
    "weigh": "权衡",
}


def parse_existing_translations():
    base = {}
    adjective = {}
    verb = {}
    if not SOURCE_DATA_JS.exists():
        return base, adjective, verb

    pattern = re.compile(r'^\s*(\[".*?"\]),?\s*$', re.MULTILINE)
    for match in pattern.finditer(SOURCE_DATA_JS.read_text(encoding="utf-8")):
        try:
            row = json.loads(match.group(1))
        except json.JSONDecodeError:
            continue
        if len(row) != 9:
            continue
        _, base_zh, base_en, adj_zh, adj_en, _, verb_zh, verb_en, _ = row
        base[base_en] = base_zh
        for part in base_en.split("/"):
            base[part.strip()] = base_zh
        adjective[adj_en] = adj_zh
        verb[verb_en] = verb_zh
    base.update(CUSTOM_BASE_ZH)
    adjective.update(CUSTOM_ADJ_ZH)
    verb.update(CUSTOM_VERB_ZH)
    return base, adjective, verb


BASE_ZH, ADJ_ZH, VERB_ZH = parse_existing_translations()


def normalize_base(base):
    normalized = base.strip()
    for prefix in ("the ", "a ", "an "):
        if normalized.startswith(prefix):
            normalized = normalized[len(prefix) :]
            break
    return normalized


def split_collocation(phrase, kind):
    words = phrase.split()
    if not words:
        return "", phrase
    if kind == "verb":
        if phrase.startswith("attach monetary value to "):
            return "attach monetary value to", phrase.replace("attach monetary value to ", "", 1)
        if words[:2] == ["adapt", "to"]:
            return "adapt to", " ".join(words[2:])
        if words[:2] == ["shift", "to"]:
            return "shift to", " ".join(words[2:])
        if words[:2] == ["rely", "on"]:
            return "rely on", " ".join(words[2:])
        return words[0], " ".join(words[1:])
    return words[0], " ".join(words[1:])


def base_zh(base):
    normalized = normalize_base(base)
    return BASE_ZH.get(base) or BASE_ZH.get(normalized) or base


def focus_zh(focus, kind):
    return (VERB_ZH if kind == "verb" else ADJ_ZH).get(focus, focus)


def collocation_zh(phrase, kind):
    if phrase in CUSTOM_PHRASE_ZH:
        return CUSTOM_PHRASE_ZH[phrase]
    focus, base = split_collocation(phrase, kind)
    translated_base = base_zh(base)
    translated_focus = focus_zh(focus, kind)
    if "{base}" in translated_focus:
        return translated_focus.format(base=translated_base)
    return f"{translated_focus}{translated_base}"


def card_html(topic, subtopic, phrase, kind):
    focus, base = split_collocation(phrase, kind)
    label = "Adjective collocation" if kind == "adjective" else "Verb collocation"
    color = "#7e22ce" if kind == "adjective" else "#2563eb"
    chinese = collocation_zh(phrase, kind)
    front = "".join(
        [
            f'<div style="font-size:24px;font-weight:700">{html_escape(chinese)}</div>',
            f'<div style="margin-top:8px;color:#666">{html_escape(topic["zh"])} / {html_escape(topic["id"])} · {label}</div>',
            f'<div style="font-size:14px;color:#888;margin-top:6px">{html_escape(subtopic[1])}</div>',
        ]
    )
    back = "".join(
        [
            f'<div style="font-size:22px;font-weight:700">{html_escape(phrase)}</div>',
            f'<div style="margin-top:10px"><b>Base</b>: {html_escape(base_zh(base))} = {html_escape(base)}</div>',
            f'<div><b>Focus</b>: <span style="color:{color};font-weight:700">{html_escape(focus_zh(focus, kind))}</span> = <span style="color:{color};font-weight:700">{html_escape(focus)}</span></div>',
            f'<div><b>Type</b>: {label}</div>',
            f'<div style="font-size:14px;color:#888;margin-top:10px">{html_escape(subtopic[1])} / {html_escape(subtopic[0])}</div>',
        ]
    )
    return front, back


def build_notes(topics):
    notes = []
    for topic in topics:
        topic_deck = TOPIC_DECKS[topic["id"]]
        for subtopic_index, subtopic in enumerate(topic["subtopics"], start=1):
            deck = f'{ROOT_DECK}::{topic_deck}::{subtopic[0]}'
            collocations = subtopic[2]
            for phrase_index, phrase in enumerate(collocations, start=1):
                kind = "adjective" if phrase_index % 2 else "verb"
                front, back = card_html(topic, subtopic, phrase, kind)
                card_id = f'notion-subtopic-collocation-{topic["id"]}-{subtopic_index:02d}-{phrase_index:02d}-{slug(subtopic[0])}'
                tags = [
                    "IELTS_Task2",
                    "topic_collocation",
                    "notion_subtopic",
                    "2025_2026",
                    f'topic::{topic["id"]}',
                    f"subtopic::{slug(subtopic[0])}",
                    f"type::{kind}",
                    card_id,
                ]
                notes.append(
                    {
                        "deckName": deck,
                        "modelName": "Basic",
                        "fields": {"Front": front, "Back": back},
                        "tags": tags,
                        "options": {"allowDuplicate": False, "duplicateScope": "deck"},
                        "cardId": card_id,
                    }
                )
    return notes


def delete_wrong_overview_notes():
    note_ids = request("findNotes", {"query": f'deck:"{WRONG_DECK}"'})
    if note_ids:
        request("deleteNotes", {"notes": note_ids})
    return len(note_ids)


def sync_notes(notes):
    added = []
    updated = 0
    skipped = 0
    created_decks = sorted({note["deckName"] for note in notes})
    for deck in created_decks:
        request("createDeck", {"deck": deck})

    for start in range(0, len(notes), CHUNK_SIZE):
        chunk = notes[start : start + CHUNK_SIZE]
        new_notes = []
        for note in chunk:
            note_ids = request("findNotes", {"query": f'tag:{note["cardId"]}'})
            if note_ids:
                request("updateNoteFields", {"note": {"id": note_ids[0], "fields": note["fields"]}})
                updated += 1
            else:
                add_note = {key: value for key, value in note.items() if key != "cardId"}
                new_notes.append(add_note)

        if new_notes:
            can_add = request("canAddNotes", {"notes": new_notes})
            addable = [note for note, ok in zip(new_notes, can_add) if ok]
            skipped += len(new_notes) - len(addable)
            if addable:
                added.extend(request("addNotes", {"notes": addable}))
        time.sleep(0.15)

    return created_decks, added, updated, skipped


def main():
    topics = load_topics()
    notes = build_notes(topics)
    deleted_wrong = delete_wrong_overview_notes()
    created_decks, added, updated, skipped = sync_notes(notes)
    result = {
        "syncedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "rootDeck": ROOT_DECK,
        "removedWrongOverviewNotes": deleted_wrong,
        "targetSubtopicDecks": len(created_decks),
        "totalCollocationCards": len(notes),
        "added": len([note_id for note_id in added if note_id]),
        "updated": updated,
        "skippedAsDuplicates": skipped,
        "sampleDecks": created_decks[:8],
    }
    RESULT_FILE.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
