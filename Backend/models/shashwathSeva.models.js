



// import { getConnection } from "../utils/db.js"

// const serializeResult = (data) => {
//     return JSON.parse(JSON.stringify(data, (key, value) =>
//         typeof value === 'bigint' ? value.toString() : value
//     ))
// }

// class ShashwathSeva {
//     static async createShashwathSeva(entityCode, bookingData) {
//         const conn = await getConnection();
//         try {
//             // Get next customer code
//             const [maxCustCode] = await conn.query(
//                 "SELECT COALESCE(MAX(CUST_CODE), 0) + 1 as nextCode FROM sevadhar WHERE entity_code = ?",
//                 [entityCode]
//             );
//             const custCode = serializeResult(maxCustCode).nextCode;

//             // Insert devotee details first
//             await conn.query(
//                 `INSERT INTO sevadhar (
//                     ENTITY_CODE, CUST_CODE, CUST_NAME, 
//                     CUST_EMAIL_ID1, CUST_MOBILE_NUM1,
//                     CUST_RES_ADDRESS1, CUST_RES_ADDRESS2,
//                     CUST_RES_CITY, CUST_RES_STATE, 
//                     CUST_RES_COUNTRY, CUST_RES_PIN_NUM,
//                     CR_BY, CR_ON
//                 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
//                 [
//                     entityCode,
//                     custCode,
//                     `${bookingData.devoteeDetails.firstName} ${bookingData.devoteeDetails.middleName} ${bookingData.devoteeDetails.lastName}`.trim(),
//                     bookingData.devoteeDetails.email,
//                     bookingData.devoteeDetails.mobile,
//                     bookingData.devoteeDetails.addressLane1,
//                     bookingData.devoteeDetails.addressLane2,
//                     bookingData.devoteeDetails.city,
//                     bookingData.devoteeDetails.state,
//                     bookingData.devoteeDetails.country,
//                     bookingData.devoteeDetails.pincode,
//                     bookingData.devoteeDetails.firstName // using firstName as CR_BY
//                 ]
//             );

//             // Handle Other Sevas
//             const otherSevas = bookingData.sevas.filter(item => 
//                 item.sevas.some(seva => seva.sevaShashwath === 'O')
//             );

//             for (const sevaGroup of otherSevas) {
//                 const oSevas = sevaGroup.sevas.filter(seva => seva.sevaShashwath === 'O');
                
//                 for (const seva of oSevas) {
//                     const osCode = `OS${Date.now()}${Math.floor(Math.random() * 1000)}`;

//                     // Insert into other_seva
//                     await conn.query(
//                         `INSERT INTO other_seva (
//                             ENTITY_CODE, NS_CUST_CODE, NS_CODE, NS_SEVA_DATE,
//                             NS_IN_MEMORY, CR_BY, CR_ON
//                         ) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
//                         [
//                             entityCode,
//                             custCode,
//                             osCode,
//                             seva.performanceDate || new Date(),
//                             seva.inMemoryOf || null,
//                             bookingData.devoteeDetails.firstName
//                         ]
//                     );

//                     // Insert into other_seva_dtl
//                     await conn.query(
//                         `INSERT INTO other_seva_dtl (
//                             ENTITY_CODE, NSD_CUST_CODE, NSD_CODE, NSD_DTL_SL,
//                             NSD_SEVA_CODE, NSD_SEVA_AMT, NSD_SEVA_QTY,
//                             NSD_TOT_SEVA_AMT, NSD_SEVA_DATE
//                         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//                         [
//                             entityCode,
//                             custCode,
//                             osCode,
//                             1,
//                             seva.sevaCode,
//                             seva.amount,
//                             seva.quantity,
//                             seva.amount * seva.quantity,
//                             seva.performanceDate || new Date()
//                         ]
//                     );
//                 }
//             }

//             // Handle Nityanidhi Sevas
//             const nithyanidhiSevas = bookingData.sevas.filter(item => 
//                 item.sevas.some(seva => seva.sevaShashwath === 'N')
//             );

//             for (const sevaGroup of nithyanidhiSevas) {
//                 const nSevas = sevaGroup.sevas.filter(seva => seva.sevaShashwath === 'N');
                
//                 for (const seva of nSevas) {
//                     const nsCode = `NS${Date.now()}${Math.floor(Math.random() * 1000)}`;

//                     // Insert into nithyanidhi_seva
//                     await conn.query(
//                         `INSERT INTO nithyanidhi_seva (
//                             ENTITY_CODE, NS_CUST_CODE, NS_CODE, NS_SEVA_DATE,
//                             NS_IN_MEMORY, CR_BY, CR_ON
//                         ) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
//                         [
//                             entityCode,
//                             custCode,
//                             nsCode,
//                             seva.performanceDate || new Date(),
//                             seva.inMemoryOf || null,
//                             bookingData.devoteeDetails.firstName
//                         ]
//                     );

//                     // Insert into nithyanidhi_seva_dtl
//                     await conn.query(
//                         `INSERT INTO nithyanidhi_seva_dtl (
//                             ENTITY_CODE, NSD_CUST_CODE, NSD_CODE, NSD_DTL_SL,
//                             NSD_SEVA_CODE, NSD_SEVA_AMT, NSD_SEVA_QTY,
//                             NSD_TOT_SEVA_AMT, NSD_SEVA_DATE
//                         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//                         [
//                             entityCode,
//                             custCode,
//                             nsCode,
//                             1,
//                             seva.sevaCode,
//                             seva.amount,
//                             seva.quantity,
//                             seva.amount * seva.quantity,
//                             seva.performanceDate || new Date()
//                         ]
//                     );
//                 }
//             }

//             // Filter Shashwath Sevas (SS) from booking data
//             const shashwathSevas = bookingData.sevas.filter(item => 
//                 item.sevas.some(seva => seva.sevaShashwath === 'SS')
//             );

//             for (const sevaGroup of shashwathSevas) {
//                 const ssSevas = sevaGroup.sevas.filter(seva => seva.sevaShashwath === 'SS');
            
//                 for (const seva of ssSevas) {
//                     // Generate unique SS_CODE
//                     const ssCode = `SS${Date.now()}${Math.floor(Math.random() * 1000)}`;
//                     const getPakshaCode = (paksha) => {
//                         if (!paksha) return 'S'; // Default to Shukla if undefined
                        
//                         const pakshaValue = paksha.toString().toLowerCase();
//                         if (pakshaValue.includes('krishna')) return 'K';
//                         if (pakshaValue.includes('shukla')) return 'S';
//                         return 'S'; // Default fallback
//                     };
                    

//                                           // Insert into shashwath_seva
//                                           await conn.query(
//                                               `INSERT INTO shashwath_seva (
//                                                   ENTITY_CODE, SS_CUST_CODE, SS_CODE, SEVA_CALENDAR,
//                                                   SS_MAASA, SS_PASKSHA, SS_THITHI, SS_IN_MEMORY,
//                                                   CR_BY, CR_ON
//                                               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
//                                               [
//                                                   entityCode,
//                                                   custCode,
//                                                   ssCode,
//                                                   seva.ssDetails.calendarType === 'ritual' ? 'R' : 'G',
//                                                   seva.ssDetails.maasa,
//                                                   getPakshaCode(seva.ssDetails.paksha), // Convert paksha to single character
//                                                   seva.ssDetails.tithi,
//                                                   seva.ssDetails.inMemoryOf,
//                                                   bookingData.devoteeDetails.fullName
//                                               ]
//                                           );
//                     // Insert into shashwath_seva_dtl
//                     await conn.query(
//                         `INSERT INTO shashwath_seva_dtl (
//                             ENTITY_CODE, SSD_CUST_CODE, SSD_CODE, SSD_DTL_SL,
//                             SSD_SEVA_CODE, SSD_RECPT_DATE, SSD_SEVA_AMT,
//                             SSD_SEVA_QTY, SSD_TOT_SEVA_AMT, SSD_MAASA,
//                             SSD_PAKSHA, SSD_THITHI
//                         ) VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?)`,
//                         [
//                             entityCode,
//                             custCode,
//                             ssCode,
//                             1,
//                             seva.sevaCode,
//                             seva.amount,
//                             seva.quantity,
//                             seva.amount * seva.quantity,
//                             seva.ssDetails.maasa,
//                             getPakshaCode(seva.ssDetails.paksha),
//                             seva.ssDetails.tithi
//                         ]
//                     );
//                 }
//             }
//             return { success: true, custCode };
//         } catch (error) {
//             console.error('Error in createShashwathSeva:', error);
//             throw error;
//         }
//     }
// }    static async getShashwathSevasByCustomer(entityCode, custCode) {
//         const conn = await getConnection();
//         const result = await conn.query(
//             `SELECT ss.*, ssd.* 
//              FROM shashwath_seva ss 
//              JOIN shashwath_seva_dtl ssd 
//              ON ss.SS_CODE = ssd.SSD_CODE 
//              WHERE ss.ENTITY_CODE = ? 
//              AND ss.SS_CUST_CODE = ?`,
//             [entityCode, custCode]
//         );
//         return serializeResult(result);
//     }
// }
// export { ShashwathSeva };


import { getConnection } from "../utils/db.js";

const serializeResult = (data) => {
    return JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
};

const getPakshaCode = (paksha) => {
    if (!paksha) return 'S';
    const pakshaValue = paksha.toString().toLowerCase();
    if (pakshaValue.includes('krishna')) return 'K';
    if (pakshaValue.includes('shukla')) return 'S';
    return 'S';
};



// export class ShashwathSeva {
//     static async createShashwathSeva(entityCode, bookingData) {
//         const conn = await getConnection();
//         try {
//             // Get next customer code
//             const [maxCustCode] = await conn.query(
//                 "SELECT COALESCE(MAX(CUST_CODE), 0) + 1 as nextCode FROM sevadhar WHERE entity_code = ?",
//                 [entityCode]
//             );
//             const custCode = serializeResult(maxCustCode).nextCode;

//             // Insert devotee details
//             await conn.query(
//                 `INSERT INTO sevadhar (
//                     ENTITY_CODE, CUST_CODE, CUST_NAME, 
//                     CUST_EMAIL_ID1, CUST_MOBILE_NUM1,
//                     CUST_RES_ADDRESS1, CUST_RES_ADDRESS2,
//                     CUST_RES_CITY, CUST_RES_STATE, 
//                     CUST_RES_COUNTRY, CUST_RES_PIN_NUM,
//                     CR_BY, CR_ON
//                 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
//                 [
//                     entityCode,
//                     custCode,
//                     `${bookingData.devoteeDetails.firstName} ${bookingData.devoteeDetails.middleName} ${bookingData.devoteeDetails.lastName}`.trim(),
//                     bookingData.devoteeDetails.email,
//                     bookingData.devoteeDetails.mobile,
//                     bookingData.devoteeDetails.addressLane1,
//                     bookingData.devoteeDetails.addressLane2,
//                     bookingData.devoteeDetails.city,
//                     bookingData.devoteeDetails.state,
//                     bookingData.devoteeDetails.country,
//                     bookingData.devoteeDetails.pincode,
//                     bookingData.devoteeDetails.firstName
//                 ]
//             );

//             // Handle Shashwath Sevas
//             const shashwathSevas = bookingData.sevas.filter(item => 
//                 item.sevas.some(seva => seva.sevaShashwath === 'SS')
//             );

//             for (const sevaGroup of shashwathSevas) {
//                 const ssSevas = sevaGroup.sevas.filter(seva => seva.sevaShashwath === 'SS');
                
//                 for (const seva of ssSevas) {
//                     const ssCode = `SS${Date.now()}${Math.floor(Math.random() * 1000)}`;

//                     await conn.query(
//                         `INSERT INTO shashwath_seva (
//                             ENTITY_CODE, SS_CUST_CODE, SS_CODE, SEVA_CALENDAR,
//                             SS_MAASA, SS_PASKSHA, SS_THITHI, SS_IN_MEMORY,
//                             CR_BY, CR_ON
//                         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
//                         [
//                             entityCode,
//                             custCode,
//                             ssCode,
//                             seva.ssDetails.calendarType === 'ritual' ? 'R' : 'G',
//                             seva.ssDetails.maasa,
//                             getPakshaCode(seva.ssDetails.paksha),
//                             seva.ssDetails.tithi,
//                             seva.ssDetails.inMemoryOf,
//                             bookingData.devoteeDetails.firstName
//                         ]
//                     );

//                     await conn.query(
//                         `INSERT INTO shashwath_seva_dtl (
//                             ENTITY_CODE, SSD_CUST_CODE, SSD_CODE, SSD_DTL_SL,
//                             SSD_SEVA_CODE, SSD_RECPT_DATE, SSD_SEVA_AMT,
//                             SSD_SEVA_QTY, SSD_TOT_SEVA_AMT, SSD_MAASA,
//                             SSD_PAKSHA, SSD_THITHI
//                         ) VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?)`,
//                         [
//                             entityCode,
//                             custCode,
//                             ssCode,
//                             1,
//                             seva.sevaCode,
//                             seva.amount,
//                             seva.quantity,
//                             seva.amount * seva.quantity,
//                             seva.ssDetails.maasa,
//                             getPakshaCode(seva.ssDetails.paksha),
//                             seva.ssDetails.tithi
//                         ]
//                     );
//                 }
//             }

//             // Handle Nityanidhi Sevas
//             const nithyanidhiSevas = bookingData.sevas.filter(item => 
//                 item.sevas.some(seva => seva.sevaShashwath === 'N')
//             );

//             for (const sevaGroup of nithyanidhiSevas) {
//                 const nSevas = sevaGroup.sevas.filter(seva => seva.sevaShashwath === 'N');
                
//                 for (const seva of nSevas) {
//                     const nsCode = `NS${Date.now()}${Math.floor(Math.random() * 1000)}`;

//                     await conn.query(
//                         `INSERT INTO nithyanidhi_seva (
//                             ENTITY_CODE, NS_CUST_CODE, NS_CODE, NS_SEVA_DATE,
//                             NS_IN_MEMORY, CR_BY, CR_ON
//                         ) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
//                         [
//                             entityCode,
//                             custCode,
//                             nsCode,
//                             seva.performanceDate || new Date(),
//                             seva.inMemoryOf || null,
//                             bookingData.devoteeDetails.firstName
//                         ]
//                     );

//                     await conn.query(
//                         `INSERT INTO nithyanidhi_seva_dtl (
//                             ENTITY_CODE, NSD_CUST_CODE, NSD_CODE, NSD_DTL_SL,
//                             NSD_SEVA_CODE, NSD_SEVA_AMT, NSD_SEVA_QTY,
//                             NSD_TOT_SEVA_AMT, NSD_SEVA_DATE
//                         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//                         [
//                             entityCode,
//                             custCode,
//                             nsCode,
//                             1,
//                             seva.sevaCode,
//                             seva.amount,
//                             seva.quantity,
//                             seva.amount * seva.quantity,
//                             seva.performanceDate || new Date()
//                         ]
//                     );
//                 }
//             }

//             // Handle Other Sevas
//             const otherSevas = bookingData.sevas.filter(item => 
//                 item.sevas.some(seva => seva.sevaShashwath === 'O')
//             );

//             for (const sevaGroup of otherSevas) {
//                 const oSevas = sevaGroup.sevas.filter(seva => seva.sevaShashwath === 'O');
                
//                 for (const seva of oSevas) {
//                     const osCode = `OS${Date.now()}${Math.floor(Math.random() * 1000)}`;

//                     await conn.query(
//                         `INSERT INTO other_seva (
//                             ENTITY_CODE, NS_CUST_CODE, NS_CODE, NS_SEVA_DATE,
//                             NS_IN_MEMORY, CR_BY, CR_ON
//                         ) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
//                         [
//                             entityCode,
//                             custCode,
//                             osCode,
//                             seva.performanceDate || new Date(),
//                             seva.inMemoryOf || null,
//                             bookingData.devoteeDetails.firstName
//                         ]
//                     );

//                     await conn.query(
//                         `INSERT INTO other_seva_dtl (
//                             ENTITY_CODE, NSD_CUST_CODE, NSD_CODE, NSD_DTL_SL,
//                             NSD_SEVA_CODE, NSD_SEVA_AMT, NSD_SEVA_QTY,
//                             NSD_TOT_SEVA_AMT, NSD_SEVA_DATE
//                         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//                         [
//                             entityCode,
//                             custCode,
//                             osCode,
//                             1,
//                             seva.sevaCode,
//                             seva.amount,
//                             seva.quantity,
//                             seva.amount * seva.quantity,
//                             seva.performanceDate || new Date()
//                         ]
//                     );
//                 }
//             }

//             return { success: true, custCode };
//         } catch (error) {
//             console.error('Error in createShashwathSeva:', error);
//             throw error;
//         }
//     }

//     static async getShashwathSevasByCustomer(entityCode, custCode) {
//         const conn = await getConnection();
//         const result = await conn.query(
//             `SELECT ss.*, ssd.* 
//              FROM shashwath_seva ss 
//              JOIN shashwath_seva_dtl ssd 
//              ON ss.SS_CODE = ssd.SSD_CODE 
//              WHERE ss.ENTITY_CODE = ? 
//              AND ss.SS_CUST_CODE = ?`,
//             [entityCode, custCode]
//         );
//         return serializeResult(result);
//     }
// }
const generateSevaCode = (entityCode) => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
    return `${entityCode}|${formattedDate}`;
};
export class ShashwathSeva {
    static async createShashwathSeva(entityCode, bookingData) {
        const conn = await getConnection();
        try {
            const [maxCustCode] = await conn.query(
                "SELECT COALESCE(MAX(CUST_CODE), 0) + 1 as nextCode FROM sevadhar WHERE entity_code = ?",
                [entityCode]
            );
            const custCode = serializeResult(maxCustCode).nextCode;

            await conn.query(
                `INSERT INTO sevadhar (
                    ENTITY_CODE, CUST_CODE, CUST_NAME, 
                    CUST_EMAIL_ID1, CUST_MOBILE_NUM1,
                    CUST_RES_ADDRESS1, CUST_RES_ADDRESS2,
                    CUST_RES_CITY, CUST_RES_STATE, 
                    CUST_RES_COUNTRY, CUST_RES_PIN_NUM,
                    CR_BY, CR_ON
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
                [
                    entityCode,
                    custCode,
                    `${bookingData.devoteeDetails.firstName} ${bookingData.devoteeDetails.middleName} ${bookingData.devoteeDetails.lastName}`.trim(),
                    bookingData.devoteeDetails.email,
                    bookingData.devoteeDetails.mobile,
                    bookingData.devoteeDetails.addressLane1,
                    bookingData.devoteeDetails.addressLane2,
                    bookingData.devoteeDetails.city,
                    bookingData.devoteeDetails.state,
                    bookingData.devoteeDetails.country,
                    bookingData.devoteeDetails.pincode,
                    bookingData.devoteeDetails.firstName
                ]
            );

            const shashwathSevas = bookingData.sevas.filter(item => 
                item.sevas.some(seva => seva.sevaShashwath === 'SS')
            );

            for (const sevaGroup of shashwathSevas) {
                const ssSevas = sevaGroup.sevas.filter(seva => seva.sevaShashwath === 'SS');
                
                for (const seva of ssSevas) {
                    const ssCode = generateSevaCode(entityCode);

                    await conn.query(
                        `INSERT INTO shashwath_seva (
                            ENTITY_CODE, SS_CUST_CODE, SS_CODE, SEVA_CALENDAR,
                            SS_MAASA, SS_PASKSHA, SS_THITHI, SS_IN_MEMORY,
                            CR_BY, CR_ON
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
                        [
                            entityCode,
                            custCode,
                            ssCode,
                            seva.ssDetails.calendarType === 'ritual' ? 'R' : 'G',
                            seva.ssDetails.calendarType === 'ritual' ? seva.ssDetails.maasa : null,
                            seva.ssDetails.calendarType === 'ritual' ? getPakshaCode(seva.ssDetails.paksha) : null,
                            seva.ssDetails.calendarType === 'ritual' ? seva.ssDetails.tithi : null,
                            seva.ssDetails.inMemoryOf,
                            bookingData.devoteeDetails.firstName
                        ]
                    );

                    await conn.query(
                        `INSERT INTO shashwath_seva_dtl (
                            ENTITY_CODE, SSD_CUST_CODE, SSD_CODE, SSD_DTL_SL,
                            SSD_SEVA_CODE, SSD_RECPT_DATE, SSD_SEVA_AMT,
                            SSD_SEVA_QTY, SSD_TOT_SEVA_AMT, SSD_MAASA,
                            SSD_PAKSHA, SSD_THITHI, SSD_DD, SSD_MM
                        ) VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
                            entityCode,
                            custCode,
                            ssCode,
                            1,
                            seva.sevaCode,
                            seva.amount,
                            seva.quantity,
                            seva.amount * seva.quantity,
                            seva.ssDetails.calendarType === 'ritual' ? seva.ssDetails.maasa : null,
                            seva.ssDetails.calendarType === 'ritual' ? getPakshaCode(seva.ssDetails.paksha) : null,
                            seva.ssDetails.calendarType === 'ritual' ? seva.ssDetails.tithi : null,
                            seva.ssDetails.calendarType === 'normal' ? seva.ssDetails.day : null,
                            seva.ssDetails.calendarType === 'normal' ? seva.ssDetails.month : null
                        ]
                    );
                }
            }

            const nithyanidhiSevas = bookingData.sevas.filter(item => 
                item.sevas.some(seva => seva.sevaShashwath === 'N')
            );

            for (const sevaGroup of nithyanidhiSevas) {
                const nSevas = sevaGroup.sevas.filter(seva => seva.sevaShashwath === 'N');
                
                for (const seva of nSevas) {
                    const nsCode = generateSevaCode(entityCode);

                    await conn.query(
                        `INSERT INTO nithyanidhi_seva (
                            ENTITY_CODE, NS_CUST_CODE, NS_CODE, NS_SEVA_DATE,
                            NS_IN_MEMORY, CR_BY, CR_ON
                        ) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
                        [
                            entityCode,
                            custCode,
                            nsCode,
                            seva.performanceDate || new Date(),
                            seva.inMemoryOf || null,
                            bookingData.devoteeDetails.firstName
                        ]
                    );

                    await conn.query(
                        `INSERT INTO nithyanidhi_seva_dtl (
                            ENTITY_CODE, NSD_CUST_CODE, NSD_CODE, NSD_DTL_SL,
                            NSD_SEVA_CODE, NSD_SEVA_AMT, NSD_SEVA_QTY,
                            NSD_TOT_SEVA_AMT, NSD_SEVA_DATE
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
                            entityCode,
                            custCode,
                            nsCode,
                            1,
                            seva.sevaCode,
                            seva.amount,
                            seva.quantity,
                            seva.amount * seva.quantity,
                            seva.performanceDate || new Date()
                        ]
                    );
                }
            }

            const otherSevas = bookingData.sevas.filter(item => 
                item.sevas.some(seva => seva.sevaShashwath === 'O')
            );

            for (const sevaGroup of otherSevas) {
                const oSevas = sevaGroup.sevas.filter(seva => seva.sevaShashwath === 'O');
                
                for (const seva of oSevas) {
                    const osCode = generateSevaCode(entityCode);
                    await conn.query(
                        `INSERT INTO other_seva (
                            ENTITY_CODE, NS_CUST_CODE, NS_CODE, NS_SEVA_DATE,
                            NS_IN_MEMORY, CR_BY, CR_ON
                        ) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
                        [
                            entityCode,
                            custCode,
                            osCode,
                            seva.performanceDate || new Date(),
                            seva.inMemoryOf || null,
                            bookingData.devoteeDetails.firstName
                        ]
                    );

                    await conn.query(
                        `INSERT INTO other_seva_dtl (
                            ENTITY_CODE, NSD_CUST_CODE, NSD_CODE, NSD_DTL_SL,
                            NSD_SEVA_CODE, NSD_SEVA_AMT, NSD_SEVA_QTY,
                            NSD_TOT_SEVA_AMT, NSD_SEVA_DATE
                        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
                            entityCode,
                            custCode,
                            osCode,
                            1,
                            seva.sevaCode,
                            seva.amount,
                            seva.quantity,
                            seva.amount * seva.quantity,
                            seva.performanceDate || new Date()
                        ]
                    );
                }
            }

            return { success: true, custCode };
        } catch (error) {
            console.error('Error in createShashwathSeva:', error);
            throw error;
        }
    }

    static async getShashwathSevasByCustomer(entityCode, custCode) {
        const conn = await getConnection();
        const result = await conn.query(
            `SELECT ss.*, ssd.* 
             FROM shashwath_seva ss 
             JOIN shashwath_seva_dtl ssd 
             ON ss.SS_CODE = ssd.SSD_CODE 
             WHERE ss.ENTITY_CODE = ? 
             AND ss.SS_CUST_CODE = ?`,
            [entityCode, custCode]
        );
        return serializeResult(result);
    }
}
