package com.great_team.projects.vol.repository;


import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.great_team.projects.vol.entity.Vol;


@Repository
public interface VolRepository extends JpaRepository<Vol,String>{

	
	@Query("SELECT v FROM Vol v WHERE v.numAvion = ?1 and v.dateVol > NOW()")
	ArrayList<Vol> getVolsWillUseAvion(Long numAvion);
	
	@Query("SELECT v FROM Vol v WHERE v.numAvion = ?1 and v.dateVol > NOW() and v.refVol!=?2")
	ArrayList<Vol> getVolsWillUseAvionExcept(Long numAvion, String refVol);

}
