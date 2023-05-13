import History from './History';
import ModifyHistory from './ModifyHistory';

export default function HistoryList({ histories, code, detail }) {
  return (
    <ul>
      {histories.map((history) => {
        switch (history.type) {
          case 'classModify':
            return (
              <ModifyHistory
                key={history.id}
                code={code}
                histories={histories}
                history={history}
                members={detail.members}
              />
            );
          default:
            return (
              <History
                key={history.id}
                code={code}
                histories={histories}
                history={history}
                members={detail.members}
              />
            );
        }
      })}
    </ul>
  );
}
