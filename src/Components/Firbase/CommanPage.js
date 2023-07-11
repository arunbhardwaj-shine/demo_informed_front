import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import WebinarQuestion from './WebinarQuestion';
import PollQuestion from './PollQuestion';
const CommanPage = () =>{

    return (
        <Tabs>
        <TabList>
          <Tab>Webinar</Tab>
          <Tab>PollQuestion </Tab>
          <Tab>Title 3</Tab>
        </TabList>
    
        <TabPanel>
         <WebinarQuestion />
        </TabPanel>
        <TabPanel>
         <PollQuestion />
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    )
}
export default  CommanPage