import { Empty } from '../components/Bits.jsx';
import { usePageTitle } from '../App.jsx';
const topics = ['Cholera','Typhoid','Diarrhoeal diseases','Dysentery','Hepatitis A and E'];
export default function Health() { usePageTitle('Health and prevention');
  return (<><h1>Health and prevention</h1>
    <p>A contaminant in water does not prove that a person is ill or that an outbreak exists. This site cannot diagnose. Seek medical care for severe or persistent symptoms.</p>
    {topics.map((t) => <section className="card" key={t}><h2>{t}</h2>
      <Empty title="Reviewed guidance pending">Content will be added from MoHFW, NCDC or WHO sources with links and review dates. None is shown until then.</Empty></section>)}</>); }
