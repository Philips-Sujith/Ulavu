import React from "react";
import { CheckCircle, Clock, Shield, Sparkles, MapPin } from "lucide-react";

export default function StatusBadge({ type, value, icon = true }) {
  let badgeClass = "badge-neutral";
  let IconComponent = null;

  switch (type) {
    case "score": {
      const score = Number(value) || 0;
      if (score >= 90) {
        badgeClass = "badge-green";
        IconComponent = Sparkles;
      } else if (score >= 70) {
        badgeClass = "badge-amber";
        IconComponent = Sparkles;
      } else {
        badgeClass = "badge-neutral";
        IconComponent = Sparkles;
      }
      return (
        <span className={`badge ${badgeClass}`}>
          {icon && IconComponent && <IconComponent size={12} />}
          <span>{score}% Match</span>
        </span>
      );
    }

    case "farmingType":
      return (
        <span className="badge badge-green">
          {icon && <Sparkles size={12} />}
          <span>{value}</span>
        </span>
      );

    case "location":
      return (
        <span className="badge badge-neutral">
          {icon && <MapPin size={12} />}
          <span>{value}</span>
        </span>
      );

    case "deal":
      if (value === "Agreed") {
        return (
          <span className="badge badge-green">
            {icon && <CheckCircle size={12} />}
            <span>Deal Agreed</span>
          </span>
        );
      } else if (value === "In Discussion") {
        return (
          <span className="badge badge-amber">
            {icon && <Clock size={12} />}
            <span>In Discussion</span>
          </span>
        );
      } else {
        return (
          <span className="badge badge-blue">
            {icon && <Clock size={12} />}
            <span>Deal Initiated</span>
          </span>
        );
      }

    case "module4Preview":
      return (
        <span className="badge badge-neutral" title="Trust verification model coming in Module 4">
          {icon && <Shield size={12} />}
          <span>Verified Farmer (M4 Preview)</span>
        </span>
      );

    default:
      return (
        <span className={`badge ${badgeClass}`}>
          <span>{value}</span>
        </span>
      );
  }
}
