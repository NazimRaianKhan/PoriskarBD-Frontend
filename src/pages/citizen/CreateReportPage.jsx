import PageHeader from '../../components/common/PageHeader';
import WasteReportForm from '../../components/forms/WasteReportForm';

export default function CreateReportPage() {
  return (
    <>
      <PageHeader title="Create Waste Report" subtitle="Submit a new waste issue for your area." />
      <WasteReportForm />
    </>
  );
}