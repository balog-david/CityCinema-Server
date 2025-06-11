const Room = require("../models/Room");

async function seedRoom() {
    try {
        const existingRoom1 = await Room.findOne({ name: "Terem-1"});
        if(!existingRoom1) {
            await new Room({
                name: "Terem-1",
                seats: [
                    [
                        { id: "A1", status: "available", reservedby: "", until: "" },
                        { id: "A2", status: "available", reservedby: "", until: "" },
                        { id: "A3", status: "available", reservedby: "", until: "" },
                        { id: "A4", status: "available", reservedby: "", until: "" },
                        { id: "A5", status: "available", reservedby: "", until: "" },
                        { id: "A6", status: "available", reservedby: "", until: "" },
                        { id: "A7", status: "available", reservedby: "", until: "" },
                        { id: "A8", status: "available", reservedby: "", until: "" },
                        { id: "A9", status: "available", reservedby: "", until: "" },
                        { id: "A10", status: "available", reservedby: "", until: "" },
                        { id: "A11", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "B1", status: "available", reservedby: "", until: "" },
                        { id: "B2", status: "available", reservedby: "", until: "" },
                        { id: "B3", status: "available", reservedby: "", until: "" },
                        { id: "B4", status: "available", reservedby: "", until: "" },
                        { id: "B5", status: "available", reservedby: "", until: "" },
                        { id: "B6", status: "available", reservedby: "", until: "" },
                        { id: "B7", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "C1", status: "available", reservedby: "", until: "" },
                        { id: "C2", status: "available", reservedby: "", until: "" },
                        { id: "C3", status: "available", reservedby: "", until: "" },
                        { id: "C4", status: "available", reservedby: "", until: "" },
                        { id: "C5", status: "available", reservedby: "", until: "" },
                        { id: "C6", status: "available", reservedby: "", until: "" },
                        { id: "C7", status: "available", reservedby: "", until: "" },
                    ],
                    [
                        { id: "D1", status: "available", reservedby: "", until: "" },
                        { id: "D2", status: "available", reservedby: "", until: "" },
                        { id: "D3", status: "available", reservedby: "", until: "" },
                        { id: "D4", status: "available", reservedby: "", until: "" },
                        { id: "D5", status: "available", reservedby: "", until: "" },
                        { id: "D6", status: "available", reservedby: "", until: "" },
                        { id: "D7", status: "available", reservedby: "", until: "" },
                    ],
                    [
                        { id: "E1", status: "available", reservedby: "", until: "" },
                        { id: "E2", status: "available", reservedby: "", until: "" },
                        { id: "E3", status: "available", reservedby: "", until: "" },
                        { id: "E4", status: "available", reservedby: "", until: "" },
                        { id: "E5", status: "available", reservedby: "", until: "" },
                        { id: "E6", status: "available", reservedby: "", until: "" },
                        { id: "E7", status: "available", reservedby: "", until: "" },
                    ],
                    [
                        { id: "F1", status: "available", reservedby: "", until: "" },
                        { id: "F2", status: "available", reservedby: "", until: "" },
                        { id: "F3", status: "available", reservedby: "", until: "" },
                        { id: "F4", status: "available", reservedby: "", until: "" },
                        { id: "F5", status: "available", reservedby: "", until: "" },
                        { id: "F6", status: "available", reservedby: "", until: "" },
                        { id: "F7", status: "available", reservedby: "", until: "" },
                    ],
                    [
                        { id: "G1", status: "available", reservedby: "", until: "" },
                        { id: "G2", status: "available", reservedby: "", until: "" },
                        { id: "G3", status: "available", reservedby: "", until: "" },
                        { id: "G4", status: "available", reservedby: "", until: "" },
                        { id: "G5", status: "available", reservedby: "", until: "" },
                        { id: "G6", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "H1", status: "available", reservedby: "", until: "" },
                        { id: "H2", status: "available", reservedby: "", until: "" },
                        { id: "H3", status: "available", reservedby: "", until: "" },
                        { id: "H4", status: "available", reservedby: "", until: "" },
                        { id: "H5", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "I1", status: "available", reservedby: "", until: "" },
                        { id: "I2", status: "available", reservedby: "", until: "" },
                        { id: "I3", status: "available", reservedby: "", until: "" },
                        { id: "I4", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "J1", status: "available", reservedby: "", until: "" },
                        { id: "J2", status: "available", reservedby: "", until: "" },
                        { id: "J3", status: "available", reservedby: "", until: "" }
                    ]
                ]
            }).save();
        } else {
            console.log("Terem-1 már létezik.");
        }
    } catch(err) {
        console.error("Hiba a seedRoom1 futtatásakor", err);
    }
    try {
        const existingRoom2 = await Room.findOne({ name: "Terem-2"});
        if(!existingRoom2) {
            await new Room({
                name: "Terem-2",
                seats: [
                    [
                        { id: "A1", status: "available", reservedby: "", until: "" },
                        { id: "A2", status: "available", reservedby: "", until: "" },
                        { id: "A3", status: "available", reservedby: "", until: "" },
                        { id: "A4", status: "available", reservedby: "", until: "" },
                        { id: "A5", status: "available", reservedby: "", until: "" },
                        { id: "A6", status: "available", reservedby: "", until: "" },
                        { id: "A7", status: "available", reservedby: "", until: "" },
                        { id: "A8", status: "available", reservedby: "", until: "" },
                        { id: "A9", status: "available", reservedby: "", until: "" },
                        { id: "A10", status: "available", reservedby: "", until: "" }
                        
                    ],
                    [
                        { id: "B1", status: "available", reservedby: "", until: "" },
                        { id: "B2", status: "available", reservedby: "", until: "" },
                        { id: "B3", status: "available", reservedby: "", until: "" },
                        { id: "B4", status: "available", reservedby: "", until: "" },
                        { id: "B5", status: "available", reservedby: "", until: "" },
                        { id: "B6", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "C1", status: "available", reservedby: "", until: "" },
                        { id: "C2", status: "available", reservedby: "", until: "" },
                        { id: "C3", status: "available", reservedby: "", until: "" },
                        { id: "C4", status: "available", reservedby: "", until: "" },
                        { id: "C5", status: "available", reservedby: "", until: "" },
                        { id: "C6", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "D1", status: "available", reservedby: "", until: "" },
                        { id: "D2", status: "available", reservedby: "", until: "" },
                        { id: "D3", status: "available", reservedby: "", until: "" },
                        { id: "D4", status: "available", reservedby: "", until: "" },
                        { id: "D5", status: "available", reservedby: "", until: "" },
                        { id: "D6", status: "available", reservedby: "", until: "" },
                        { id: "D7", status: "available", reservedby: "", until: "" },
                    ],
                    [
                        { id: "E1", status: "available", reservedby: "", until: "" },
                        { id: "E2", status: "available", reservedby: "", until: "" },
                        { id: "E3", status: "available", reservedby: "", until: "" },
                        { id: "E4", status: "available", reservedby: "", until: "" },
                        { id: "E5", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "F1", status: "available", reservedby: "", until: "" },
                        { id: "F2", status: "available", reservedby: "", until: "" },
                        { id: "F3", status: "available", reservedby: "", until: "" },
                        { id: "F4", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "G1", status: "available", reservedby: "", until: "" },
                        { id: "G2", status: "available", reservedby: "", until: "" },
                        { id: "G3", status: "available", reservedby: "", until: "" },
                        { id: "G4", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "H1", status: "available", reservedby: "", until: "" },
                        { id: "H2", status: "available", reservedby: "", until: "" },
                        { id: "H3", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "I1", status: "available", reservedby: "", until: "" },
                        { id: "I2", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "J1", status: "available", reservedby: "", until: "" }
                    ]
                ]
            }).save();
        } else {
            console.log("Terem-2 már létezik.");
        }
    } catch(err) {
        console.error("Hiba a seedRoom2 futtatásakor", err);
    }
    try {
        const existingRoom3 = await Room.findOne({ name: "Terem-3"});
        if(!existingRoom3) {
            await new Room({
                name: "Terem-3",
                seats: [
                    [
                        { id: "A1", status: "available", reservedby: "", until: "" },
                        { id: "A2", status: "available", reservedby: "", until: "" },
                        { id: "A3", status: "available", reservedby: "", until: "" },
                        { id: "A4", status: "available", reservedby: "", until: "" },
                        { id: "A5", status: "available", reservedby: "", until: "" },
                        { id: "A6", status: "available", reservedby: "", until: "" },
                        { id: "A7", status: "available", reservedby: "", until: "" },
                        { id: "A8", status: "available", reservedby: "", until: "" },
                        { id: "A9", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "B1", status: "available", reservedby: "", until: "" },
                        { id: "B2", status: "available", reservedby: "", until: "" },
                        { id: "B3", status: "available", reservedby: "", until: "" },
                        { id: "B4", status: "available", reservedby: "", until: "" },
                        { id: "B5", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "C1", status: "available", reservedby: "", until: "" },
                        { id: "C2", status: "available", reservedby: "", until: "" },
                        { id: "C3", status: "available", reservedby: "", until: "" },
                        { id: "C4", status: "available", reservedby: "", until: "" },
                        { id: "C5", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "D1", status: "available", reservedby: "", until: "" },
                        { id: "D2", status: "available", reservedby: "", until: "" },
                        { id: "D3", status: "available", reservedby: "", until: "" },
                        { id: "D4", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "E1", status: "available", reservedby: "", until: "" },
                        { id: "E2", status: "available", reservedby: "", until: "" },
                        { id: "E3", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "F1", status: "available", reservedby: "", until: "" },
                        { id: "F2", status: "available", reservedby: "", until: "" },
                        { id: "F3", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "G1", status: "available", reservedby: "", until: "" },
                        { id: "G2", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "H1", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "I1", status: "available", reservedby: "", until: "" },
                        { id: "I2", status: "available", reservedby: "", until: "" },
                        { id: "I3", status: "available", reservedby: "", until: "" },
                        { id: "I4", status: "available", reservedby: "", until: "" }
                    ]
                ]
            }).save();
        } else {
            console.log("Terem-3 már létezik.");
        }
    } catch(err) {
        console.error("Hiba a seedRoom3 futtatásakor", err);
    }
    try {
        const existingRoom4 = await Room.findOne({ name: "Terem-4"});
        if(!existingRoom4) {
            await new Room({
                name: "Terem-4",
                seats: [
                    [
                        { id: "A1", status: "available", reservedby: "", until: "" },
                        { id: "A2", status: "available", reservedby: "", until: "" },
                        { id: "A3", status: "available", reservedby: "", until: "" },
                        { id: "A4", status: "available", reservedby: "", until: "" },
                        { id: "A5", status: "available", reservedby: "", until: "" },
                        { id: "A6", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "B1", status: "available", reservedby: "", until: "" },
                        { id: "B2", status: "available", reservedby: "", until: "" },
                        { id: "B3", status: "available", reservedby: "", until: "" },
                        { id: "B4", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "C1", status: "available", reservedby: "", until: "" },
                        { id: "C2", status: "available", reservedby: "", until: "" },
                        { id: "C3", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "D1", status: "available", reservedby: "", until: "" },
                        { id: "D2", status: "available", reservedby: "", until: "" },
                        { id: "D3", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "E1", status: "available", reservedby: "", until: "" },
                        { id: "E2", status: "available", reservedby: "", until: "" }
                    ],
                    [
                        { id: "F1", status: "available", reservedby: "", until: "" }
                    ]
                ]
            }).save();
        } else {
            console.log("Terem-4 már létezik.");
        }
    } catch(err) {
        console.error("Hiba a seedRoom4 futtatásakor", err);
    }
};

module.exports = seedRoom;