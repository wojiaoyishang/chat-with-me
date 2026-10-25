// Sanitized /ordered-region response captured from the backend on 2026-10-25.
// Only identity fields were removed or replaced; lane, precision, keys and partial-date values are unchanged.
const region = {
  "centerId": "backend-day",
  "nodes": [
    {
      "id": "backend-day",
      "labels": [
        "OrderedNode",
        "Knowledge",
        "Time"
      ],
      "name": "12日",
      "label": "Time",
      "properties": {
        "chunk_type": null,
        "summary": "",
        "ordered_generated": true,
        "ordered_key": "12",
        "ordered_precision": "day",
        "ordered_rank": 12,
        "ordered_scope": "source:timeScope:fixture-diary",
        "ordered_missing": false,
        "ordered_status": "partial",
        "ordered_short_label": "12日",
        "ordered_lane": "calendar:day",
        "ordered_value": "--09-12",
        "ordered_axis_name": "diary-time",
        "ordered_axis": "backend-time-axis",
        "ordered_version": 2,
        "ordered_field": "value",
        "ordered_parent": "backend-month",
        "ordered_kind": "time"
      }
    },
    {
      "id": "backend-next-day",
      "labels": [
        "OrderedNode",
        "Knowledge",
        "Time"
      ],
      "name": "13日",
      "label": "Time",
      "properties": {
        "chunk_type": null,
        "summary": "",
        "ordered_generated": false,
        "ordered_key": "13",
        "ordered_precision": "day",
        "ordered_end": null,
        "ordered_rank": 13,
        "ordered_scope": "source:timeScope:fixture-diary",
        "ordered_missing": false,
        "ordered_status": "partial",
        "ordered_short_label": "13日",
        "ordered_lane": "calendar:day",
        "ordered_start": null,
        "ordered_value": "--09-13",
        "ordered_axis_name": "diary-time",
        "ordered_axis": "backend-time-axis",
        "ordered_version": 2,
        "ordered_phase": null,
        "ordered_field": "value",
        "ordered_parent": "backend-month",
        "ordered_kind": "time"
      }
    },
    {
      "id": "backend-month",
      "labels": [
        "OrderedNode",
        "Knowledge",
        "Time"
      ],
      "name": "9月",
      "label": "Time",
      "properties": {
        "summary": "",
        "ordered_parent": null,
        "ordered_precision": "month",
        "ordered_start": null,
        "ordered_short_label": "9月",
        "chunk_type": null,
        "ordered_end": null,
        "ordered_status": "partial",
        "ordered_generated": true,
        "ordered_kind": "time",
        "ordered_value": "--09",
        "ordered_rank": 9,
        "ordered_axis_name": "diary-time",
        "ordered_axis": "backend-time-axis",
        "ordered_field": "value",
        "ordered_lane": "calendar:month",
        "ordered_key": "9",
        "ordered_version": 2,
        "ordered_missing": false,
        "ordered_phase": null,
        "ordered_scope": "source:timeScope:fixture-diary"
      }
    },
    {
      "id": "backend-minute",
      "name": "10:20 时刻",
      "labels": [
        "OrderedNode",
        "Knowledge",
        "Time"
      ],
      "label": "Time",
      "properties": {
        "summary": "",
        "ordered_parent": "backend-day",
        "ordered_start": null,
        "ordered_precision": "minute",
        "ordered_short_label": "10:20",
        "chunk_type": null,
        "ordered_end": null,
        "ordered_status": "partial",
        "ordered_generated": false,
        "ordered_value": "--09-12T10:20",
        "ordered_kind": "time",
        "ordered_rank": 37200000000,
        "ordered_axis_name": "diary-time",
        "ordered_axis": "backend-time-axis",
        "ordered_field": "value",
        "ordered_lane": "clock:minute",
        "ordered_key": "37200000000",
        "ordered_version": 2,
        "ordered_missing": false,
        "ordered_phase": null,
        "ordered_scope": "source:timeScope:fixture-diary"
      }
    },
    {
      "id": "backend-next-minute",
      "name": "14:00 时刻",
      "labels": [
        "OrderedNode",
        "Knowledge",
        "Time"
      ],
      "label": "Time",
      "properties": {
        "summary": "",
        "ordered_parent": "backend-day",
        "ordered_start": null,
        "ordered_precision": "minute",
        "ordered_short_label": "14:00",
        "chunk_type": null,
        "ordered_end": null,
        "ordered_status": "partial",
        "ordered_generated": false,
        "ordered_value": "--09-12T14:00",
        "ordered_kind": "time",
        "ordered_rank": 50400000000,
        "ordered_axis_name": "diary-time",
        "ordered_axis": "backend-time-axis",
        "ordered_field": "value",
        "ordered_lane": "clock:minute",
        "ordered_key": "50400000000",
        "ordered_version": 2,
        "ordered_missing": false,
        "ordered_phase": null,
        "ordered_scope": "source:timeScope:fixture-diary"
      }
    },
    {
      "id": "backend-second",
      "name": "14:00:05 时刻",
      "labels": [
        "OrderedNode",
        "Knowledge",
        "Time"
      ],
      "label": "Time",
      "properties": {
        "summary": "",
        "ordered_parent": "backend-day",
        "ordered_start": null,
        "ordered_precision": "second",
        "ordered_short_label": "14:00:05",
        "chunk_type": null,
        "ordered_end": null,
        "ordered_status": "partial",
        "ordered_generated": false,
        "ordered_value": "--09-12T14:00:05",
        "ordered_kind": "time",
        "ordered_rank": 50405000000,
        "ordered_axis_name": "diary-time",
        "ordered_axis": "backend-time-axis",
        "ordered_field": "value",
        "ordered_lane": "clock:second",
        "ordered_key": "50405000000",
        "ordered_version": 2,
        "ordered_missing": false,
        "ordered_phase": null,
        "ordered_scope": "source:timeScope:fixture-diary"
      }
    },
    {
      "id": "backend-morning",
      "name": "早上",
      "labels": [
        "OrderedNode",
        "Knowledge",
        "Time"
      ],
      "label": "Time",
      "properties": {
        "summary": "",
        "ordered_parent": "backend-day",
        "ordered_start": null,
        "ordered_precision": "dayperiod",
        "ordered_short_label": "早上",
        "chunk_type": null,
        "ordered_end": null,
        "ordered_status": "anchored-phase",
        "ordered_generated": false,
        "ordered_value": "--09-12@morning",
        "ordered_kind": "time",
        "ordered_rank": 1,
        "ordered_axis_name": "diary-time",
        "ordered_axis": "backend-time-axis",
        "ordered_field": "value",
        "ordered_lane": "phase",
        "ordered_key": "1",
        "ordered_version": 2,
        "ordered_missing": false,
        "ordered_phase": "morning",
        "ordered_scope": "source:timeScope:fixture-diary"
      }
    },
    {
      "id": "backend-afternoon",
      "name": "下午",
      "labels": [
        "OrderedNode",
        "Knowledge",
        "Time"
      ],
      "label": "Time",
      "properties": {
        "summary": "",
        "ordered_parent": "backend-day",
        "ordered_start": null,
        "ordered_precision": "dayperiod",
        "ordered_short_label": "下午",
        "chunk_type": null,
        "ordered_end": null,
        "ordered_status": "anchored-phase",
        "ordered_generated": false,
        "ordered_value": "--09-12@afternoon",
        "ordered_kind": "time",
        "ordered_rank": 3,
        "ordered_axis_name": "diary-time",
        "ordered_axis": "backend-time-axis",
        "ordered_field": "value",
        "ordered_lane": "phase",
        "ordered_key": "3",
        "ordered_version": 2,
        "ordered_missing": false,
        "ordered_phase": "afternoon",
        "ordered_scope": "source:timeScope:fixture-diary"
      }
    },
    {
      "id": "backend-bedtime",
      "name": "睡前",
      "labels": [
        "OrderedNode",
        "Knowledge",
        "Time"
      ],
      "label": "Time",
      "properties": {
        "summary": "",
        "ordered_parent": "backend-day",
        "ordered_start": null,
        "ordered_precision": "relative",
        "ordered_short_label": "睡前",
        "chunk_type": null,
        "ordered_end": null,
        "ordered_status": "anchored-relative",
        "ordered_generated": false,
        "ordered_value": "--09-12@relative:睡前",
        "ordered_kind": "time",
        "ordered_rank": null,
        "ordered_axis_name": "diary-time",
        "ordered_axis": "backend-time-axis",
        "ordered_field": "value",
        "ordered_lane": "relative",
        "ordered_key": null,
        "ordered_version": 2,
        "ordered_missing": false,
        "ordered_phase": "睡前",
        "ordered_scope": "source:timeScope:fixture-diary"
      }
    },
    {
      "id": "backend-dinner",
      "name": "晚饭",
      "labels": [
        "OrderedNode",
        "Knowledge",
        "Time"
      ],
      "label": "Time",
      "properties": {
        "summary": "",
        "ordered_parent": "backend-day",
        "ordered_start": null,
        "ordered_precision": "relative",
        "ordered_short_label": "晚饭",
        "chunk_type": null,
        "ordered_end": null,
        "ordered_status": "anchored-relative",
        "ordered_generated": false,
        "ordered_value": "--09-12@relative:晚饭",
        "ordered_kind": "time",
        "ordered_rank": null,
        "ordered_axis_name": "diary-time",
        "ordered_axis": "backend-time-axis",
        "ordered_field": "value",
        "ordered_lane": "relative",
        "ordered_key": null,
        "ordered_version": 2,
        "ordered_missing": false,
        "ordered_phase": "晚饭",
        "ordered_scope": "source:timeScope:fixture-diary"
      }
    }
  ],
  "relationships": [
    {
      "id": "backend-parent-day",
      "from_string": "9月",
      "source": "backend-month",
      "to_string": "12日",
      "target": "backend-day",
      "properties": {
        "ordered_axis": "backend-time-axis"
      },
      "type": "ORDERED_CONTAINS"
    },
    {
      "id": "backend-parent-next-day",
      "from_string": "9月",
      "source": "backend-month",
      "to_string": "13日",
      "target": "backend-next-day",
      "properties": {
        "ordered_axis": "backend-time-axis"
      },
      "type": "ORDERED_CONTAINS"
    },
    {
      "id": "backend-parent-morning",
      "from_string": "12日",
      "source": "backend-day",
      "to_string": "早上",
      "target": "backend-morning",
      "properties": {
        "ordered_axis": "backend-time-axis"
      },
      "type": "ORDERED_CONTAINS"
    },
    {
      "id": "backend-parent-afternoon",
      "from_string": "12日",
      "source": "backend-day",
      "to_string": "下午",
      "target": "backend-afternoon",
      "properties": {
        "ordered_axis": "backend-time-axis"
      },
      "type": "ORDERED_CONTAINS"
    },
    {
      "id": "backend-parent-dinner",
      "from_string": "12日",
      "source": "backend-day",
      "to_string": "晚饭",
      "target": "backend-dinner",
      "properties": {
        "ordered_axis": "backend-time-axis"
      },
      "type": "ORDERED_CONTAINS"
    },
    {
      "id": "backend-parent-bedtime",
      "from_string": "12日",
      "source": "backend-day",
      "to_string": "睡前",
      "target": "backend-bedtime",
      "properties": {
        "ordered_axis": "backend-time-axis"
      },
      "type": "ORDERED_CONTAINS"
    },
    {
      "id": "backend-parent-minute",
      "from_string": "12日",
      "source": "backend-day",
      "to_string": "10:20 时刻",
      "target": "backend-minute",
      "properties": {
        "ordered_axis": "backend-time-axis"
      },
      "type": "ORDERED_CONTAINS"
    },
    {
      "id": "backend-parent-next-minute",
      "from_string": "12日",
      "source": "backend-day",
      "to_string": "14:00 时刻",
      "target": "backend-next-minute",
      "properties": {
        "ordered_axis": "backend-time-axis"
      },
      "type": "ORDERED_CONTAINS"
    },
    {
      "id": "backend-parent-second",
      "from_string": "12日",
      "source": "backend-day",
      "to_string": "14:00:05 时刻",
      "target": "backend-second",
      "properties": {
        "ordered_axis": "backend-time-axis"
      },
      "type": "ORDERED_CONTAINS"
    },
    {
      "id": "backend-next-day",
      "from_string": "12日",
      "source": "backend-day",
      "to_string": "13日",
      "target": "backend-next-day",
      "properties": {
        "ordered_axis": "backend-time-axis"
      },
      "type": "NEXT_ORDERED"
    },
    {
      "id": "backend-next-morning",
      "from_string": "早上",
      "source": "backend-morning",
      "to_string": "下午",
      "target": "backend-afternoon",
      "properties": {
        "ordered_axis": "backend-time-axis"
      },
      "type": "NEXT_ORDERED"
    },
    {
      "id": "backend-next-minute",
      "from_string": "10:20 时刻",
      "source": "backend-minute",
      "to_string": "14:00 时刻",
      "target": "backend-next-minute",
      "properties": {
        "ordered_axis": "backend-time-axis"
      },
      "type": "NEXT_ORDERED"
    }
  ],
  "previousId": null,
  "nextId": "backend-next-day",
  "completeParentIds": [
    "backend-day"
  ],
  "hasMore": false
};

export const backendOrderedTimeRegion = () => structuredClone(region);
