const getMetrics = () => {
  return [
    {
      code: "RPM",
      name: "RPM",
      value: Math.random() * (200 - 0) + 0,
      unit: "RPM"
    },
    {
      code: "SPEED",
      name: "Speed",
      value: Math.random() * (200 - 0) + 0,
      unit: "Km/h"
    }
  ];
};

module.exports = getMetrics;
