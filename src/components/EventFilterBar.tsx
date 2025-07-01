import { Input, DatePicker, Select, Button, Tooltip } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { useDebounce } from "../hooks/useDebounce";

const { Option } = Select;

export type TEventFilters = {
  title?: string;
  date?: string; // e.g. 2025-07-01
  range?: "currentWeek" | "lastWeek" | "currentMonth" | "lastMonth";
};

type TProps = {
  onFilterChange: (filters: TEventFilters) => void;
};

const EventFilterBar = ({ onFilterChange }: TProps) => {
  const [rawTitle, setRawTitle] = useState<string>(""); //  for typing

  const [filters, setFilters] = useState<TEventFilters>({
    // date: dayjs().format("YYYY-MM-DD"), // default to today
  });

  const debouncedTitle = useDebounce(rawTitle, 500); //  600ms delay

  //  Update filters only when debounced title changes
  useEffect(() => {
    if (debouncedTitle !== "") {
      setFilters({
        title: debouncedTitle,
        date: undefined,
        range: undefined,
      });
    }
  }, [debouncedTitle]);

  useEffect(() => {
    onFilterChange(filters); // pass filter state up
  }, [filters, onFilterChange]);

  const handleClear = () => {
    setRawTitle("");
    setFilters({});
  };

  const disabledDate = (current: Dayjs) => {
    const today = dayjs().startOf("day");
    const maxDate = dayjs().add(5, "year").endOf("day");

    return current.isBefore(today) || current.isAfter(maxDate);
  };
  return (
    <div className="w-full mb-6">
      <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
        {/* Title Search */}
        <Input
          placeholder="Search by title"
          size="large"
          className="lg:w-1/4"
          allowClear
          onChange={(e) => setRawTitle(e.target.value)}
          value={rawTitle}
        />

        {/* Date Picker (Today filter) */}
        <DatePicker
          showNow
          size="large"
          className="w-full lg:w-1/4"
          disabledDate={disabledDate}
          onChange={(date) => {
            const value = date ? date.format("YYYY-MM-DD") : undefined;
            setFilters({
              title: undefined,
              date: value,
              range: undefined,
            });
            setRawTitle("");
          }}
        />

        {/* Date Range Selector */}
        <Select
          placeholder="Select Date Range"
          size="large"
          allowClear
          className="w-full lg:w-1/4"
          onChange={(value) => {
            setFilters({
              title: undefined,
              date: undefined,
              range: value,
            });
            setRawTitle(""); // reset raw title if range used
          }}
        >
          <Option value="currentWeek">Current Week</Option>
          <Option value="lastWeek">Last Week</Option>
          <Option value="currentMonth">Current Month</Option>
          <Option value="lastMonth">Last Month</Option>
        </Select>

        {/* Clear Filter Button */}
        <div className="w-full lg:w-1/4">
          <Tooltip title="Clear filters">
            <Button
              size="large"
              icon={<CloseCircleOutlined />}
              onClick={handleClear}
              className="w-full flex justify-center items-center" // 👈 makes it stretch and center the icon
            >
              Clear
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default EventFilterBar;
