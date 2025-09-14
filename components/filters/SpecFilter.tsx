"use client";

import React from "react";
import { Typography, Accordion, AccordionSummary, AccordionDetails, FormControlLabel, Checkbox } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { SpecFilterProps } from "./types";

const SpecFilter: React.FC<SpecFilterProps> = React.memo(({
  filters,
  onFilterChange,
  specType,
  uniqueValues,
  icon,
  title,
  emoji,
}) => {
  const handleSpecToggle = (value: string) => {
    const currentSpecs = filters[specType] as string[];
    const newSpecs = currentSpecs.includes(value)
      ? currentSpecs.filter(s => s !== value)
      : [...currentSpecs, value];
    onFilterChange({ [specType]: newSpecs });
  };

  if (uniqueValues.length === 0) return null;

  const getColorClasses = () => {
    switch (specType) {
      case 'ram':
        return {
          expandIcon: 'text-orange-600',
          gradient: 'from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100',
          iconBg: 'bg-orange-100',
          iconText: 'text-orange-600',
          checkboxColor: '#ea580c'
        };
      case 'storage':
        return {
          expandIcon: 'text-teal-600',
          gradient: 'from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100',
          iconBg: 'bg-teal-100',
          iconText: 'text-teal-600',
          checkboxColor: '#0d9488'
        };
      case 'os':
        return {
          expandIcon: 'text-indigo-600',
          gradient: 'from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100',
          iconBg: 'bg-indigo-100',
          iconText: 'text-indigo-600',
          checkboxColor: '#4f46e5'
        };
      default:
        return {
          expandIcon: 'text-gray-600',
          gradient: 'from-gray-50 to-gray-50 hover:from-gray-100 hover:to-gray-100',
          iconBg: 'bg-gray-100',
          iconText: 'text-gray-600',
          checkboxColor: '#6b7280'
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <Accordion className="shadow-sm border-0 bg-white rounded-xl overflow-hidden">
      <AccordionSummary
        expandIcon={<ExpandMore className={colorClasses.expandIcon} />}
        className={`px-6 py-4 min-h-48 bg-gradient-to-r ${colorClasses.gradient} transition-colors`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${colorClasses.iconBg} rounded-lg flex items-center justify-center`}>
            <span className={`${colorClasses.iconText} text-sm font-bold`}>{emoji}</span>
          </div>
          <Typography variant="subtitle1" className="font-semibold text-gray-800">
            {title} ({uniqueValues.length})
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails className="px-6 pb-6 max-h-48 overflow-y-auto">
        <div className="space-y-3">
          {uniqueValues.map((value) => (
            <FormControlLabel
              key={value}
              control={
                <Checkbox
                  checked={(filters[specType] as string[]).includes(value)}
                  onChange={() => handleSpecToggle(value)}
                  color={icon as "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default"}
                  size="small"
                  sx={{
                    '&.Mui-checked': {
                      color: colorClasses.checkboxColor,
                    },
                  }}
                />
              }
              label={
                <span className="text-sm font-medium text-gray-700">{value}</span>
              }
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
});

SpecFilter.displayName = 'SpecFilter';

export default SpecFilter;
