<?php

namespace Spatie\SchemaOrg\Contracts;

interface FireStationContract
{
    public function additionalProperty($additionalProperty);

    public function additionalType($additionalType);

    public function address($address);

    public function aggregateRating($aggregateRating);

    public function alternateName($alternateName);

    public function amenityFeature($amenityFeature);

    public function areaServed($areaServed);

    public function award($award);

    public function awards($awards);

    public function branchCode($branchCode);

    public function branchOf($branchOf);

    public function brand($brand);

    public function contactPoint($contactPoint);

    public function contactPoints($contactPoints);

    public function containedIn($containedIn);

    public function containedInPlace($containedInPlace);

    public function containsPlace($containsPlace);

    public function currenciesAccepted($currenciesAccepted);

    public function department($department);

    public function description($description);

    public function disambiguatingDescription($disambiguatingDescription);

    public function dissolutionDate($dissolutionDate);

    public function duns($duns);

    public function email($email);

    public function employee($employee);

    public function employees($employees);

    public function event($event);

    public function events($events);

    public function faxNumber($faxNumber);

    public function founder($founder);

    public function founders($founders);

    public function foundingDate($foundingDate);

    public function foundingLocation($foundingLocation);

    public function funder($funder);

    public function geo($geo);

    public function globalLocationNumber($globalLocationNumber);

    public function hasMap($hasMap);

    public function hasOfferCatalog($hasOfferCatalog);

    public function hasPOS($hasPOS);

    public function identifier($identifier);

    public function image($image);

    public function isAccessibleForFree($isAccessibleForFree);

    public function isicV4($isicV4);

    public function latitude($latitude);

    public function legalName($legalName);

    public function leiCode($leiCode);

    public function location($location);

    public function logo($logo);

    public function longitude($longitude);

    public function mainEntityOfPage($mainEntityOfPage);

    public function makesOffer($makesOffer);

    public function map($map);

    public function maps($maps);

    public function maximumAttendeeCapacity($maximumAttendeeCapacity);

    public function member($member);

    public function memberOf($memberOf);

    public function members($members);

    public function naics($naics);

    public function name($name);

    public function numberOfEmployees($numberOfEmployees);

    public function offeredBy($offeredBy);

    public function openingHours($openingHours);

    public function openingHoursSpecification($openingHoursSpecification);

    public function owns($owns);

    public function parentOrganization($parentOrganization);

    public function paymentAccepted($paymentAccepted);

    public function photo($photo);

    public function photos($photos);

    public function potentialAction($potentialAction);

    public function priceRange($priceRange);

    public function publicAccess($publicAccess);

    public function publishingPrinciples($publishingPrinciples);

    public function review($review);

    public function reviews($reviews);

    public function sameAs($sameAs);

    public function seeks($seeks);

    public function serviceArea($serviceArea);

    public function slogan($slogan);

    public function smokingAllowed($smokingAllowed);

    public function specialOpeningHoursSpecification($specialOpeningHoursSpecification);

    public function sponsor($sponsor);

    public function subOrganization($subOrganization);

    public function subjectOf($subjectOf);

    public function taxID($taxID);

    public function telephone($telephone);

    public function url($url);

    public function vatID($vatID);

}