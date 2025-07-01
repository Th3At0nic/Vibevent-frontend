import { Input, DatePicker, Select, Button, Tooltip } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import moment from "moment";
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
    date: moment().format("YYYY-MM-DD"), // default to today
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
          size="large"
          className="w-full lg:w-1/4"
          defaultValue={moment()}
          onChange={(date) => {
            const value = date ? moment(date).format("YYYY-MM-DD") : undefined;
            setFilters({
              title: undefined,
              date: value,
              range: undefined,
            });
            setRawTitle(""); // reset raw title if date used
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
