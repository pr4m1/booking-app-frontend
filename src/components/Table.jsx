import "../style-components/Table.css";
import { v4 } from 'uuid';

function Table({children, columns, heads}){
    return(
        <div className="container-table">
            <table className="table-data">
                <colgroup>
                    {columns.map((column) => {
                        const uniqueKey = v4();
                        return(
                            <col key={uniqueKey} className={column} />
                        );
                    })}
                </colgroup>
                <thead>
                    <tr className="row-head">
                        {heads.map((titleHead) => {
                            const uniqueKey = v4();
                            return(
                                <th key={uniqueKey}>{titleHead}</th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {children}  
                </tbody>
            </table>
        </div>
    );
}

export default Table;