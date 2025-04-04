import React from "react";
import CardContent from "./CardContent";
import Card from "./Card";

export function Chat() {
    return (
        <>
            <div className="flex h-screen">
                {/* Left: Canvas for Stories */}
                <div className="w-2/3 bg-white p-6 overflow-auto">
                    <Card className="mb-4 shadow-xl rounded-2xl">
                        <CardContent>
                            <h2 className="text-2xl font-bold mb-2">The Whispering Woods</h2>
                            <p className="text-base">
                                Deep in the forest, where sunlight dances through the leaves,
                                a young girl named Aria discovered a grove that seemed to hum
                                with ancient secrets. As she stepped into the clearing, the wind
                                whispered tales of old heroes and forgotten magic. What she
                                uncovered that day would change her village's fate forever.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}