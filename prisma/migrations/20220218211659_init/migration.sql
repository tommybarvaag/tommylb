-- CreateTable
CREATE TABLE "NotificationLog" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(256) NOT NULL,
    "value" VARCHAR(500) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StravaActivity" (
    "id" SERIAL NOT NULL,
    "stravaId" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "type" VARCHAR(256) NOT NULL,
    "startDate" DATE NOT NULL,
    "startDateLocal" DATE NOT NULL,
    "distance" DECIMAL(8,2) NOT NULL,
    "movingTime" INTEGER NOT NULL,
    "locationCountry" VARCHAR(256),
    "distanceInKilometers" DECIMAL(8,2) NOT NULL,
    "formattedMovingTime" VARCHAR(256) NOT NULL,
    "kilometersPerHour" DECIMAL(8,2) NOT NULL,
    "minutesPerKilometer" DECIMAL(8,2) NOT NULL,
    "totalElevationGain" DECIMAL(8,2) NOT NULL,
    "kudosCount" INTEGER NOT NULL,
    "averageSpeed" DECIMAL(8,2) NOT NULL,
    "maxSpeed" DECIMAL(8,2) NOT NULL,
    "hasHeartRate" BOOLEAN NOT NULL,
    "averageHeartRate" DECIMAL(8,2),
    "maxHeartRate" DECIMAL(8,2),
    "sufferScore" DECIMAL(8,2),
    "calories" DECIMAL(8,2) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stravaGearId" INTEGER,

    CONSTRAINT "StravaActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StravaPersonalBest" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "distance" DECIMAL(8,2) NOT NULL,
    "distanceInKilometers" DECIMAL(8,2) NOT NULL,
    "movingTime" INTEGER NOT NULL,
    "formattedMovingTime" VARCHAR(256) NOT NULL,
    "stravaActivityId" INTEGER NOT NULL,

    CONSTRAINT "StravaPersonalBest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StravaGear" (
    "id" SERIAL NOT NULL,
    "stravaGearId" VARCHAR(256) NOT NULL,
    "primary" BOOLEAN NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "resourceState" INTEGER NOT NULL,
    "retired" BOOLEAN NOT NULL,
    "distance" DECIMAL(8,2) NOT NULL,

    CONSTRAINT "StravaGear_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StravaActivity_stravaId_key" ON "StravaActivity"("stravaId");

-- CreateIndex
CREATE UNIQUE INDEX "StravaGear_stravaGearId_key" ON "StravaGear"("stravaGearId");

-- AddForeignKey
ALTER TABLE "StravaActivity" ADD CONSTRAINT "StravaActivity_stravaGearId_fkey" FOREIGN KEY ("stravaGearId") REFERENCES "StravaGear"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StravaPersonalBest" ADD CONSTRAINT "StravaPersonalBest_stravaActivityId_fkey" FOREIGN KEY ("stravaActivityId") REFERENCES "StravaActivity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
