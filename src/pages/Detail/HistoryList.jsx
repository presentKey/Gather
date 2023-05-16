import History from './History';
import ModifiedHistory from './ModifiedHistory';

export default function HistoryList({ histories, code, members }) {
  return (
    <ul>
      {histories.map((history) => {
        switch (history.type) {
          case 'classModify':
            return (
              <ModifiedHistory key={history.id} code={code} history={history} members={members} />
            );
          default:
            return <History key={history.id} code={code} history={history} members={members} />;
        }
      })}
    </ul>
  );
}
