import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { confirmRequest, loadRequests, rejectRequest } from './RequestsSlice';
import ChildWithParent from './types/ChildWithParent';

export default function ManagerRequestsList(): JSX.Element {
  const dispatch = useAppDispatch();
  const childWithUserList = useAppSelector((state) => state.requests.childWithUserList);
  const requests = useAppSelector((state) => state.requests.requests);

  useEffect(() => {
    dispatch(loadRequests());
  }, [dispatch]);

  function parentName(childId: number): string {
    if (childId) {
      const element: ChildWithParent | undefined = childWithUserList.find(
        (e) => e.child.id === childId
      );
      if (element) {
        return `${element.userInRequestAndDialog.firstName}`;
      }
    }
    return '';
  }

  function parentLastName(childId: number): string {
    if (childId) {
      const element: ChildWithParent | undefined = childWithUserList.find(
        (e) => e.child.id === childId
      );
      if (element) {
        return `${element.userInRequestAndDialog.lastName}`;
      }
    }
    return '';
  }

  function childData(childId: number | undefined): string {
    const elements: ChildWithParent | undefined = childWithUserList.find(
      (e) => e.child.id === childId
    );
    if (elements) {
      const { child } = elements;
      const genderInfo = child.gender ? `, ${child.gender}` : '';
      return `${child.firstName}, ${child.lastName}, ${child.dateOfBirth}${genderInfo}`;
    }
    return '';
  }

  function confirmedRequests(): Request[] {
    return requests.filter((r) => r.status === 'CONFIRMED');
  }
  const confirmedRequestsList = confirmedRequests();

  function handleRejectRequest(id: number): void {
    dispatch(rejectRequest(id));
  }

  return (
    <table>
      <thead>
        <tr>
          <th>PARENT NAME</th>
          <th>PARENT LASTNAME</th>
          <th>CHILD INFORMATION</th>
          <th>STATUS</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {confirmedRequestsList.map((request) => (
          <tr key={request.id}>
            <td>{parentName(request.childId)}</td>
            <td>{parentLastName(request.childId)}</td>
            <td>{childData(request.childId)}</td>
            <td>{request.status}</td>
            <td>
              <button type="button" onClick={() => handleRejectRequest(request.id)}>
                del
              </button>
            </td>
            <td>
              <button type="button">send a message</button>
            </td>
            <td>
              <button type="button">Invite</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}