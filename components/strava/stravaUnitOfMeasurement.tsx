import Text from "../text";

type StravaUnitOfMeasurementProps = {
  title: string;
  value: number | string;
};

export default function StravaUnitOfMeasurement({
  title,
  value,
  ...other
}: StravaUnitOfMeasurementProps) {
  return (
    <div className="mr-6 flex flex-col items-center justify-center" {...other}>
      <Text className="text-sm">{title}</Text>
      <Text className="text-base font-bold">{value}</Text>
    </div>
  );
}
