import React from 'react';
import {Link} from 'react-router-dom';

import { GlobalAppContext } from '../../context/globalContext/MyAppContext';
import './additional-Info.scss'

interface AdditionalInfoProps {
    bookID: string;
    title: string;
    thumbnail: string;
    publishedDate: string;
    pageCount: number;
    description: string;
    previewLink: string;
}

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ bookID, title, thumbnail, publishedDate, pageCount, description, previewLink }) => {

    const {selectedBookID} = React.useContext(GlobalAppContext);

    return (
        <tr key={bookID} className={`additional-info ${bookID === selectedBookID ? 'fadeInRow' : 'hidden'}`}>
            <td colSpan={3}>
            <span className="additional-info__title">Additional info about the book <Link to={previewLink}>{title}</Link></span>
            <table>
                <tbody>
                <tr>
                    <th><span>Cover preview</span></th>
                    <th><span>Published Date</span></th>
                    <th><span>Page count</span></th>
                    <th className="responsive-hide"><span>Description</span></th>
                </tr>
                <tr>
                    <td><img src={thumbnail} alt="Cover-preview" /></td>
                    <td className="additional-info__publised-date">{publishedDate}</td>
                    <td className="additional-info__page-count">{pageCount}</td>
                    <td className="responsive-hide">{description ? description : 'No description was provided.'}</td>
                </tr>
                </tbody>
            </table>
            </td>
        </tr>
    )
}