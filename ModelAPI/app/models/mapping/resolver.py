# # import json
# # from typing import Dict, Any


# # DEFAULT_RESPONSE: Dict[str, Any] = {
# #     "problem": "Unknown",
# #     "SDG": "SDG ?",
# #     "insights": [],  # this will be flattened actionableInsights for the API
# # }

# # def _flatten_insights_bucket(entry: Dict[str, Any]) -> Dict[str, Any]:
# #     """
# #     Convert entry with:
# #       - problem: str
# #       - sdgs: List[str]    (multiple SDGs)
# #       - insights: {immediate:[], short_term:[], long_term:[]}
# #     into API-facing shape:
# #       - problem: str
# #       - SDG: str           (primary SDG = first of sdgs if present)
# #       - insights: List[str] (flattened)
# #     """
# #     if not isinstance(entry, dict):
# #         return DEFAULT_RESPONSE.copy()

# #     problem = entry.get("problem", DEFAULT_RESPONSE["problem"])

# #     sdgs = entry.get("sdgs") or []
# #     primary_sdg = sdgs[0] if isinstance(sdgs, list) and len(sdgs) > 0 else DEFAULT_RESPONSE["SDG"]

# #     insights_obj = entry.get("insights") or {}
# #     if isinstance(insights_obj, dict):
# #         immediate = insights_obj.get("immediate") or []
# #         short_term = insights_obj.get("short_term") or []
# #         long_term = insights_obj.get("long_term") or []
# #         flat = []
# #         # Keep category order: immediate -> short_term -> long_term
# #         if isinstance(immediate, list):
# #             flat.extend([str(x) for x in immediate])
# #         if isinstance(short_term, list):
# #             flat.extend([str(x) for x in short_term])
# #         if isinstance(long_term, list):
# #             flat.extend([str(x) for x in long_term])
# #     elif isinstance(insights_obj, list):
# #         # If someone supplied a flat list already, accept it
# #         flat = [str(x) for x in insights_obj]
# #     else:
# #         flat = []

# #     return {
# #         "problem": problem,
# #         "SDG": primary_sdg,
# #         "insights": flat,
# #     }


# # class MappingResolver:
# #     def __init__(self, mapping_path: str):
# #         with open(mapping_path, "r", encoding="utf-8") as f:
# #             raw = f.read().strip()
# #         self.mapping = json.loads(raw) if raw else {}

# #     def _lookup(self, key: str, section: str) -> Dict[str, Any] | None:
# #         sec = self.mapping.get(section)
# #         if isinstance(sec, dict) and key in sec:
# #             return sec[key]
# #         return None

# #     def resolve(self, image_label: str, text_label: str) -> Dict[str, Any]:
# #         # Normalize to lowercase and strip whitespace to prevent mismatches
# #         il = (image_label or "").strip().lower()
# #         tl = (text_label or "").strip().lower()

# #         # 1) Try pairs
# #         entry = None
# #         pairs = self.mapping.get("pairs") or {}
# #         if isinstance(pairs, dict):
# #             key = f"{il}|{tl}"
# #             entry = pairs.get(key)

# #         # 2) Fallback by image
# #         if entry is None:
# #             entry = self._lookup(il, "fallbackByImage")

# #         # 3) Fallback by text
# #         if entry is None:
# #             entry = self._lookup(tl, "fallbackByText")

# #         # 4) Default
# #         if entry is None:
# #             entry = self.mapping.get("default", {})

# #         # Convert to API-facing shape:
# #         # - SDG: primary string selected from sdgs[0]
# #         # - insights: flattened list (immediate + short_term + long_term)
# #         api_entry = _flatten_insights_bucket(entry)

# #         # Ensure required keys exist
# #         if "problem" not in api_entry:
# #             api_entry["problem"] = DEFAULT_RESPONSE["problem"]
# #         if "SDG" not in api_entry:
# #             api_entry["SDG"] = DEFAULT_RESPONSE["SDG"]
# #         if "insights" not in api_entry or not isinstance(api_entry["insights"], list):
# #             api_entry["insights"] = []

# #         return api_entry

# import json
# import re
# from typing import Dict, Any, List

# DEFAULT_RESPONSE: Dict[str, Any] = {
#     "problem": "Unknown",
#     "sdgs": ["13"],  # default numeric SDG code (as string)
#     "insights": [],  # flattened actionableInsights
# }

# def _flatten_insights(entry: Dict[str, Any]) -> List[str]:
#     insights_obj = entry.get("insights") or {}
#     if isinstance(insights_obj, dict):
#         immediate = insights_obj.get("immediate") or []
#         short_term = insights_obj.get("short_term") or []
#         long_term = insights_obj.get("long_term") or []
#         flat: List[str] = []
#         if isinstance(immediate, list):
#             flat.extend([str(x) for x in immediate])
#         if isinstance(short_term, list):
#             flat.extend([str(x) for x in short_term])
#         if isinstance(long_term, list):
#             flat.extend([str(x) for x in long_term])
#         return flat
#     if isinstance(insights_obj, list):
#         return [str(x) for x in insights_obj]
#     return []

# _sdgre = re.compile(r"\bSDG\s*([0-9]{1,2})\b", re.IGNORECASE)

# def _normalize_sdgs_to_codes(sdgs_val: Any) -> List[str]:
#     """
#     Accepts:
#       - ["SDG 12 Responsible...", "SDG 14 Life Below Water", ...]
#       - ["12","14","11"]
#       - mixture of both
#     Returns numeric codes as strings, unique, preserving order.
#     """
#     if not isinstance(sdgs_val, list):
#         return DEFAULT_RESPONSE["sdgs"]
#     out: List[str] = []
#     seen = set()
#     for item in sdgs_val:
#         s = str(item)
#         m = _sdgre.search(s)
#         code = None
#         if m:
#             code = m.group(1)
#         else:
#             if s.isdigit() and 1 <= int(s) <= 17:
#                 code = s
#         if code and code not in seen:
#             seen.add(code)
#             out.append(code)
#     return out or DEFAULT_RESPONSE["sdgs"]

# class MappingResolver:
#     def __init__(self, mapping_path: str):
#         with open(mapping_path, "r", encoding="utf-8") as f:
#             raw = f.read().strip()
#         self.mapping = json.loads(raw) if raw else {}

#     def resolve(self, image_label: str, text_label: str) -> Dict[str, Any]:
#         il = (image_label or "").strip().lower()
#         tl = (text_label or "").strip().lower()

#         entry = None

#         pairs = self.mapping.get("pairs") or {}
#         if isinstance(pairs, dict):
#             key = f"{il}|{tl}"
#             entry = pairs.get(key)

#         if entry is None:
#             fb_img = self.mapping.get("fallbackByImage") or {}
#             entry = fb_img.get(il)

#         if entry is None:
#             fb_txt = self.mapping.get("fallbackByText") or {}
#             entry = fb_txt.get(tl)

#         if entry is None:
#             entry = self.mapping.get("default", {})

#         problem = entry.get("problem", DEFAULT_RESPONSE["problem"])
#         sdgs_list = _normalize_sdgs_to_codes(entry.get("sdgs"))
#         insights_flat = _flatten_insights(entry)

#         return {
#             "problem": problem,
#             "sdgs": sdgs_list,           # e.g., ["12","14","11"]
#             "insights": insights_flat,   # flattened immediate+short_term+long_term
#         }

import json
import re
from typing import Dict, Any, List

DEFAULT_RESPONSE: Dict[str, Any] = {
    "problem": "Unknown",
    "sdgs": ["13"],  # numeric SDG code(s) as strings
    "insights": [],
}

_sdgre = re.compile(r"\bSDG\s*([0-9]{1,2})\b", re.IGNORECASE)

def _normalize_sdgs_to_codes(sdgs_val: Any) -> List[str]:
    """
    Accepts:
      - ["SDG 12 Responsible...", "SDG 14 ...", ...]
      - ["12","14","11"]
      - mixture of both
    Returns numeric codes as strings, unique, preserving order.
    """
    if not isinstance(sdgs_val, list):
        return []
    out: List[str] = []
    seen = set()
    for item in sdgs_val:
        s = str(item)
        m = _sdgre.search(s)
        code = None
        if m:
            code = m.group(1)
        elif s.isdigit() and 1 <= int(s) <= 17:
            code = s
        if code and code not in seen:
            seen.add(code)
            out.append(code)
    return out

def _flatten_insights(entry: Dict[str, Any]) -> List[str]:
    insights_obj = entry.get("insights") or {}
    if isinstance(insights_obj, dict):
        immediate = insights_obj.get("immediate") or []
        short_term = insights_obj.get("short_term") or []
        long_term = insights_obj.get("long_term") or []
        flat: List[str] = []
        if isinstance(immediate, list):
            flat.extend([str(x) for x in immediate])
        if isinstance(short_term, list):
            flat.extend([str(x) for x in short_term])
        if isinstance(long_term, list):
            flat.extend([str(x) for x in long_term])
        return flat
    if isinstance(insights_obj, list):
        return [str(x) for x in insights_obj]
    return []

class MappingResolver:
    def __init__(self, mapping_path: str):
        with open(mapping_path, "r", encoding="utf-8") as f:
            raw = f.read().strip()
        self.mapping = json.loads(raw) if raw else {}

    def resolve(self, image_label: str, text_label: str) -> Dict[str, Any]:
        il = (image_label or "").strip().lower()
        tl = (text_label or "").strip().lower()

        entry = None
        pairs = self.mapping.get("pairs") or {}
        if isinstance(pairs, dict):
            entry = pairs.get(f"{il}|{tl}")

        if entry is None:
            fb_img = self.mapping.get("fallbackByImage") or {}
            entry = fb_img.get(il)

        if entry is None:
            fb_txt = self.mapping.get("fallbackByText") or {}
            entry = fb_txt.get(tl)

        if entry is None:
            entry = self.mapping.get("default", {})

        problem = entry.get("problem", DEFAULT_RESPONSE["problem"])
        sdgs_list = _normalize_sdgs_to_codes(entry.get("sdgs"))
        if not sdgs_list:
            # Only if entry had no usable sdgs at all, fall back
            sdgs_list = DEFAULT_RESPONSE["sdgs"]

        insights_flat = _flatten_insights(entry)

        return {
            "problem": problem,
            "sdgs": sdgs_list,          # e.g., ["12","14","11"]
            "insights": insights_flat,  # flattened list
        }
